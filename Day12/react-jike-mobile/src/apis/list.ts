import { http } from '@/utils';
import { ResType } from './shared.ts';

// 定义具体的接口类型
export type ChannelItem = {
  id: number;
  name: string;
};

type ChannelRes = {
  channels: ChannelItem[];
};

// 请求频道列表
function fetchChannelAPI() {
  return http.request<ResType<ChannelRes>>({
    url: '/channels',
    method: 'GET'
  });
}

// 请求文章列表
type ListItem = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
  cover: {
    type: number;
    images: string[];
  };
};

export type ListRes = {
  results: ListItem[];
  pre_timestamp: string;
};

type ReqParam = {
  channel_id: string;
  timestamp: string;
};

function fetchListAPI(params: ReqParam) {
  return http.request<ResType<ListRes>>({
    url: '/articles',
    method: 'GET',
    params
  });
}

export { fetchChannelAPI, fetchListAPI };
