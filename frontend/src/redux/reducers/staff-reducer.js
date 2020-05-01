import {
  STAFF_FETCHING_FAILED,
  START_STAFF_FETCHING,
  FINISH_STAFF_FETCHING,
  ADD_STAFF_MEMBER,
  ADD_STAFF_MEMBER_BEGIN,
  ADD_STAFF_MEMBER_FAILED,
  EDIT_STAFF_MEMBER,
  EDIT_STAFF_MEMBER_BEGIN,
  EDIT_STAFF_MEMBER_FAILED,
} from "../actions/action-types";
import { updateArray } from "../../helper-functions";

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

    case ADD_STAFF_MEMBER_BEGIN:
      return { ...state, loading: true, error: null };
    case ADD_STAFF_MEMBER:
      return {
        ...state,
        staffMembers: state.staffMembers.concat(payload.data),
        loading: false,
      };

    case ADD_STAFF_MEMBER_FAILED:
      return { ...state, error: payload.error };

    case EDIT_STAFF_MEMBER_BEGIN:
      return { ...state, loading: true, error: null };
    case EDIT_STAFF_MEMBER:
      return {
        ...state,
        loading: false,
        staffMembers: updateArray(state.staffMembers, payload.data),
      };
    case EDIT_STAFF_MEMBER_FAILED:
      return { ...state, error: payload.error, loading: false };
    default:
      return state;
  }
};
