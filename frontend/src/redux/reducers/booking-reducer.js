import {
  CREATE_BOOKING,
  START_LIST_BOOKINGS,
  FINISH_LIST_BOOKINGS,
  LIST_BOOKINGS_FAIL,
} from "../actions/action-types";

const initialState = {
  bookings: [],
  bookingData: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_BOOKING:
      return { ...state, bookingData: { ...payload }, loading: false };

    case START_LIST_BOOKINGS:
      return { ...state, loading: true };
    case FINISH_LIST_BOOKINGS:
      return { ...state, bookings: payload.bookings, loading: false };

    case LIST_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
