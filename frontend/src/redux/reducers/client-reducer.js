import {
  UPDATE_HOTEL_CLIENT,
  UPDATE_HOTEL_CLIENT_BEGIN,
  UPDATE_HOTEL_CLIENT_FAILED,
  FETCH_HOTEL_CLIENTS,
  FETCH_HOTEL_CLIENTS_BEGIN,
  FETCH_HOTEL_CLIENTS_FAILED,
  DELETE_HOTEL_CLIENT,
  DELETE_HOTEL_CLIENT_BEGIN,
  DELETE_HOTEL_CLIENT_FAILED,
} from "../actions/action-types";

import { updateArray, deleteArrayById } from "../../helper-functions";

const initialState = {
  loading: false,
  hotelClients: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_HOTEL_CLIENTS_BEGIN:
      return { ...state, loading: true, error: null };

    case FETCH_HOTEL_CLIENTS:
      return {
        ...state,
        loading: false,
        hotelClients: payload.data,
      };

    case FETCH_HOTEL_CLIENTS_FAILED:
      return { ...state, loading: false, error: payload.error };

    case UPDATE_HOTEL_CLIENT_BEGIN:
      return { ...state, loading: true, error: null };

    case UPDATE_HOTEL_CLIENT:
      return {
        ...state,
        loading: false,
        hotelClients: updateArray(state.hotelClients, payload.data),
      };

    case UPDATE_HOTEL_CLIENT_FAILED:
      return { ...state, loading: false, error: payload.error };

    case DELETE_HOTEL_CLIENT_BEGIN:
      return { ...state, loading: true, error: null };

    case DELETE_HOTEL_CLIENT:
      return {
        ...state,
        loading: false,
        hotelClients: deleteArrayById(state.hotelClients, payload.id),
      };

    case DELETE_HOTEL_CLIENT_FAILED:
      return { ...state, loading: false, error: null };

    default:
      return state;
  }
};
