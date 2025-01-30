// 用户相关请求

import { request } from "@/utils";

// 登录请求
function loginAPI(loginForm) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: loginForm,
  });
}

// 查询用户信息
function userInfoAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}

export { loginAPI, userInfoAPI };
