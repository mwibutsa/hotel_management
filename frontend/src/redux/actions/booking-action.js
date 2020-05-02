import {
  CREATE_BOOKING,
  FINISH_LIST_BOOKINGS,
  START_LIST_BOOKINGS,
  LIST_BOOKINGS_FAIL,
  EDIT_BOOKING,
  EDIT_BOOKING_BEGIN,
  EDIT_BOOKING_FAILED,
  CREATE_BOOKING_BEGIN,
  CREATE_BOOKING_FAILED,
} from "./action-types";

import { toSnakeCase } from "../../helper-functions";
import axios from "../../axios";

export const createBooking = (bookingDetails) => async (dispatch) => {
  try {
    const booking = {};
    for (let [key, value] of Object.entries(bookingDetails)) {
      booking[toSnakeCase(key)] = value;
    }

    booking.expected_checkout_date = booking.checkout_date;
    booking.expected_check_in_date = booking.check_in_date;
    booking.room = booking.room_type;
    console.log(bookingDetails);

    delete booking.checkout_date;
    delete booking.check_in_date;
    delete booking.room_type;

    const { data } = await axios.post("/booking/create-booking/", booking);

    dispatch({ type: CREATE_BOOKING, payload: data });
  } catch (err) {
    console.log(err);
  }
};

const startListBookings = () => ({ type: START_LIST_BOOKINGS });
const finishListBookings = (data) => ({
  type: FINISH_LIST_BOOKINGS,
  payload: { bookings: data },
});
const getBookingsFailed = () => ({ type: LIST_BOOKINGS_FAIL });

export const getBookings = () => async (dispatch) => {
  try {
    dispatch(startListBookings());
    const { data } = await axios.get("/booking/list-bookings/");

    dispatch(finishListBookings(data));
  } catch (err) {
    dispatch(getBookingsFailed());
  }
};

// edit booking

const editBookingBegin = () => ({ type: EDIT_BOOKING_BEGIN });
const editBookingDone = (data) => ({ type: EDIT_BOOKING, payload: { data } });
const editBookingFailed = (error) => ({
  type: EDIT_BOOKING_FAILED,
  payload: { error },
});

export const editBooking = (id, bookingData) => async (dispatch) => {
  try {
    const booking = {};
    for (let [key, value] of Object.entries(bookingData)) {
      if (value.trim() !== "" || value !== null) {
        booking[toSnakeCase(key)] = value;
      }
    }

    booking.actual_checkout_date = booking.checkout_date;
    booking.actual_check_in_date = booking.check_in_date;
    booking.paid_advance = booking.additional_payment;
    booking.booking_status = "Confirmed";

    delete booking.checkout_date;
    delete booking.check_in_date;
    delete booking.additional_payment;

    dispatch(editBookingBegin());

    const { data } = await axios.patch(`/booking/list-bookings/${id}`, booking);

    dispatch(editBookingDone(data));
  } catch (error) {
    dispatch(editBookingFailed(error));
  }
};
