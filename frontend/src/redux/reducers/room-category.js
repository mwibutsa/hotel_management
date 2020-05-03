import {
  ADD_ROOM_CATEGORY,
  ADD_ROOM_CATEGORY_BEGIN,
  ADD_ROOM_CATEGORY_FAILED,
  EDIT_ROOM_CATEGORY,
  EDIT_ROOM_CATEGORY_BEGIN,
  EDIT_ROOM_CATEGORY_FAILED,
  FETCH_ROOM_CATEGORIES,
  FETCH_ROOM_CATEGORIES_BEGIN,
  FETCH_ROOM_CATEGORIES_FAILED,
} from "../actions/action-types";

import { updateArray } from "../../helper-functions";

const initialState = {
  roomCategories: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ROOM_CATEGORY_BEGIN:
      return { ...state, loading: true, error: null };
    case ADD_ROOM_CATEGORY:
      return {
        ...state,
        loading: false,
        roomCategories: state.roomCategories.concat(payload.data),
      };

    case ADD_ROOM_CATEGORY_FAILED:
      return { ...state, loading: false, error: payload.error };

    case FETCH_ROOM_CATEGORIES_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_ROOM_CATEGORIES:
      return { ...state, loading: false, roomCategories: payload.data };

    case FETCH_ROOM_CATEGORIES_FAILED:
      return { ...state, loading: false, error: payload.error };

    case EDIT_ROOM_CATEGORY_BEGIN:
      return { ...state, loading: true, error: null };

    case EDIT_ROOM_CATEGORY:
      return {
        ...state,
        loading: false,
        roomCategories: updateArray(state.roomCategories, payload.data),
      };

    case EDIT_ROOM_CATEGORY_FAILED:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
