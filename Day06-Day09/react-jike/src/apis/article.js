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
function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// 删除文章
function deleteArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}

// 获取文章详情
function getArticleDetailAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "GET",
  });
}

// 更新文章
function updateArticleAPI(data, id) {
  return request({
    url: `/mp/articles/${id}?draft=false`,
    method: "PUT",
    data,
  });
}

export {
  getChannelAPI,
  publishArticleAPI,
  getArticleListAPI,
  deleteArticleAPI,
  getArticleDetailAPI,
  updateArticleAPI,
};
