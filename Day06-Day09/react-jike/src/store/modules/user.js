// 用户相关数据

import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "@/utils";
import { setToken as _setToken, getToken as _getToken } from "@/utils";
import { loginAPI, userInfoAPI } from "@/apis/uesr";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: _getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    serUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      removeToken();
      state.userInfo = {};
    },
  },
});

const { setToken, serUserInfo, clearUserInfo } = userStore.actions;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    dispatch(setToken(res.data.data.token));
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await userInfoAPI();
    dispatch(serUserInfo(res.data.data));
  };
};

const userReducer = userStore.reducer;

export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
