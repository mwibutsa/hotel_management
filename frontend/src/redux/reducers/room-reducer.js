import {
  FETCH_ROOMS,
  BEGIN_FETCHING_ROOMS,
  EDIT_ROOM_DONE,
  EDIT_ROOM_FAILED,
  EDIT_ROOM_START,
} from "../actions/action-types";
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
        editedRoom: payload,
      };

    case EDIT_ROOM_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
