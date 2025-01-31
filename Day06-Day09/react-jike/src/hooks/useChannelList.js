// 封装获取频道列表的逻辑
import { useEffect, useState } from "react";
import { getChannelAPI } from "@/apis/article";

function useChannelList() {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.data.channel);
    };

    getChannelList().then();
    const testArr = [
      {
        id: -1,
        name: "测试频道",
      },
    ];
    setChannelList((channel) => channel.concat(testArr));
  }, []);

  return {
    channelList,
  };
}

export default useChannelList;
