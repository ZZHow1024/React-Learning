import { useEffect, useState } from 'react';
import { DetailDataType, fetchDetailAPI } from '@/apis/detail.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NavBar } from 'antd-mobile';

const Detail = () => {
  const [detail, setDetail] = useState<DetailDataType | null>(null);
  const [params] = useSearchParams();
  const id = params.get('id');
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchDetailAPI(id!);
        setDetail(res.data.data);
      } catch (error) {
        throw new Error('Fetch detail error: ' + error);
      }
    };
    getDetail();
  }, [id]);

  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  if (!detail) return <div>Loading...</div>;

  return (
    <>
      <NavBar onBack={onBack}>{detail?.title}</NavBar>
      <div
        dangerouslySetInnerHTML={{
          __html: detail?.content
        }}
      ></div>
    </>
  );
};

export default Detail;
