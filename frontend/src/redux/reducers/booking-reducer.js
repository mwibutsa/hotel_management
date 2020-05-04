import {
  CREATE_BOOKING,
  START_LIST_BOOKINGS,
  FINISH_LIST_BOOKINGS,
  LIST_BOOKINGS_FAIL,
  EDIT_BOOKING,
  EDIT_BOOKING_BEGIN,
  EDIT_BOOKING_FAILED,
  CREATE_BOOKING_BEGIN,
  CREATE_BOOKING_FAILED,
  DELETE_BOOKING,
  DELETE_BOOKING_BEGIN,
  DELETE_BOOKING_FAILED,
} from "../actions/action-types";
import { updateArray, deleteArrayById } from "../../helper-functions";
const initialState = {
  bookings: [],
  bookingData: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_BOOKING_BEGIN:
      return { ...state, error: null, loading: true };
    case CREATE_BOOKING:
      return { ...state, bookingData: { ...payload.data }, loading: false };

    case CREATE_BOOKING_FAILED:
      return { ...state, error: payload.error, loading: false };
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

    case EDIT_BOOKING_BEGIN:
      return { ...state, loading: true, error: null };
    case EDIT_BOOKING:
      return {
        ...state,
        bookings: updateArray(state.bookings, payload.data),
        loading: false,
      };
    case EDIT_BOOKING_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case DELETE_BOOKING_BEGIN:
      return { ...state, loading: true, error: null };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: deleteArrayById(state.bookings, payload.id),
        loading: false,
      };

    case DELETE_BOOKING_FAILED:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
