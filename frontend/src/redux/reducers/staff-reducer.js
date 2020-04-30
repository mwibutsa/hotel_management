import {
  STAFF_FETCHING_FAILED,
  START_STAFF_FETCHING,
  FINISH_STAFF_FETCHING,
} from "../actions/action-types";

const initialState = {
  staffMembers: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_STAFF_FETCHING:
      return { ...state, loading: true, error: null };

    case FINISH_STAFF_FETCHING:
      return { ...state, loading: false, staffMembers: payload.data };

    case STAFF_FETCHING_FAILED:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
