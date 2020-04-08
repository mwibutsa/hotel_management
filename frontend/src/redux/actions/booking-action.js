import { CREATE_BOOKING } from "./action-types";
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
