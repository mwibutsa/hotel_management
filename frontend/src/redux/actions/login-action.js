import {
  LOGIN_FAIL,
  START_LOGIN,
  FINISH_LOGIN,
  AUTO_LOGIN_FAILED,
  FINISH_AUTO_LOGIN,
  START_AUTO_LOGIN,
} from "./action-types";

import axios from "../../axios";

const startLogin = () => ({ type: START_LOGIN });

const loginFail = (error) => ({ type: LOGIN_FAIL, payload: { error } });

const finishLogin = (tokenData) => {
  localStorage.setItem("accessToken", tokenData.access);
  localStorage.setItem("refreshToken", tokenData.refresh);
  return {
    payload: { ...tokenData },
    type: FINISH_LOGIN,
  };
};

const startAutoLogin = () => ({
  type: START_AUTO_LOGIN,
});

const finishAutoLogin = (data) => ({
  type: FINISH_AUTO_LOGIN,
  payload: { ...data },
});

const autoLoginFailed = () => ({ type: AUTO_LOGIN_FAILED });

export const autoLogin = () => async (dispatch) => {
  try {
    dispatch(startAutoLogin());
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(finishAutoLogin({ access: accessToken, refresh: refreshToken }));
  } catch (err) {
    dispatch(autoLoginFailed());
  }
};

export const login = (credentials) => async (dispatch) => {
  console.log(credentials);
  try {
    dispatch(startLogin());
    const { data } = await axios.post("/user/login/", credentials);
    dispatch(finishLogin(data));
  } catch (error) {
    dispatch(loginFail(error));
  }
};
