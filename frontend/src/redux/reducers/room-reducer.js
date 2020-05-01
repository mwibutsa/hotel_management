import {
  FETCH_ROOMS,
  BEGIN_FETCHING_ROOMS,
  EDIT_ROOM_DONE,
  EDIT_ROOM_FAILED,
  EDIT_ROOM_START,
  ADD_ROOM_DONE,
  ADD_ROOM_FAILED,
  ADD_ROOM_START,
} from "../actions/action-types";
import { updateArray } from "../../helper-functions";
const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BEGIN_FETCHING_ROOMS:
      return { ...state, loading: true };
    case FETCH_ROOMS:
      return { ...state, loading: false, rooms: [...payload] };

    case EDIT_ROOM_START:
      return { ...state, loading: true };
    case EDIT_ROOM_DONE:
      return {
        ...state,
        rooms: updateArray(state.rooms, payload.data),
        loading: false,
      };

    case EDIT_ROOM_FAILED:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case ADD_ROOM_START:
      return { ...state, loading: true, error: null };
    case ADD_ROOM_DONE:
      return {
        ...state,
        rooms: state.rooms.concat(payload.data),
        loading: false,
        error: null,
      };
    case ADD_ROOM_FAILED:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
