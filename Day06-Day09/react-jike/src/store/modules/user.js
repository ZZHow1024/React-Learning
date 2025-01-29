// 用户相关数据

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken as _getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: _getToken() || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

const { setToken } = userStore.actions;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.data.token));
  };
};

const userReducer = userStore.reducer;

export { setToken, fetchLogin };

export default userReducer;
