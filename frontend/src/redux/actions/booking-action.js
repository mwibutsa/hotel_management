import {
  CREATE_BOOKING,
  FINISH_LIST_BOOKINGS,
  START_LIST_BOOKINGS,
  LIST_BOOKINGS_FAIL,
} from "./action-types";
import axios from "../../axios";

export const createBooking = (bookingDetails) => async (dispatch) => {
  try {
    bookingDetails = {
      customer_name: bookingDetails.customerName,
      customer_email: bookingDetails.customerEmail,
      expected_check_in_date: bookingDetails.checkInDate,
      expected_checkout_date: bookingDetails.checkoutDate,
      room: bookingDetails.roomType,
    };

    const { data } = await axios.post(
      "/booking/create-booking/",
      bookingDetails
    );

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
