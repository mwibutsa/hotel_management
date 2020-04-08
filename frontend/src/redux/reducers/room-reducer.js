import { FETCH_ROOMS, BEGIN_FETCHING_ROOMS } from "../actions/action-types";
const initialState = {
  rooms: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BEGIN_FETCHING_ROOMS:
      return { ...state, loading: true };
    case FETCH_ROOMS:
      return { ...state, loading: false, rooms: [...payload] };
    default:
      return state;
  }
};
