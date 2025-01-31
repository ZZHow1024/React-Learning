// 文章相关请求

import { request } from "@/utils";

// 获取文章频道
function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// 提交文章表单
function publishArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// 获取文章列表
function getArticleListAPI(query) {
  return request({
    url: "mp/articles",
    method: "GET",
  });
}

export { getChannelAPI, publishArticleAPI, getArticleListAPI };
