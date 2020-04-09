import {
  LOGIN_FAIL,
  START_LOGIN,
  FINISH_LOGIN,
  START_AUTO_LOGIN,
  FINISH_AUTO_LOGIN,
  AUTO_LOGIN_FAILED,
} from "../actions/action-types";

const initialState = {
  accessToken: null,
  loading: false,
  error: null,
  refreshToken: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOGIN:
      return { ...state, loading: true };
    case FINISH_LOGIN:
      return {
        ...state,
        accessToken: payload.access,
        refreshToken: payload.refresh,
        loading: false,
      };

    case LOGIN_FAIL:
      return { ...state, loading: false, error: payload.error };

    case START_AUTO_LOGIN:
      return { ...state, loading: false };
    case FINISH_AUTO_LOGIN:
      return {
        ...state,
        accessToken: payload.access,
        refreshToken: payload.refresh,
      };

    case AUTO_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
