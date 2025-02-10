import { Image, InfiniteScroll, List } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { fetchListAPI, ListRes } from '@/apis/list.ts';
import { useNavigate } from 'react-router-dom';

type Props = {
  channelId: string;
};

const HomeList = (props: Props) => {
  const { channelId } = props;

  // 获取列表数据
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: new Date().getTime().toString()
  });
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: new Date().getTime().toString()
        });
        setListRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp
        });
      } catch (error) {
        throw new Error('Fetch list error: ' + error);
      }
    };
    getList();
  }, []);

  // 标记当前是否还有新数据
  const [hasMore, setHasMore] = useState(true);
  // 加载下一页函数
  const loadMore = async () => {
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp
      });
      setListRes({
        results: [...listRes.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp
      });

      // 判断是否还有数据
      if (res.data.data.results.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      throw new Error('Fetch list error: ' + error);
    }
  };

  const navigate = useNavigate();
  const goToDetail = (id: string) => {
    navigate(`/detail?id=${id}`);
  };

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            key={item.art_id}
            onClick={() => goToDetail(item.art_id)}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </>
  );
};

export default HomeList;
