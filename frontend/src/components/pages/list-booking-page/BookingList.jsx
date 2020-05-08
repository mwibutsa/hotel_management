import React, { useEffect, useState, useReducer, useCallback } from "react";
import classes from "./BookingList.module.css";
import SideNavigation from "../../side-navigation/SideNavigation";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import {
  getBookings,
  editBooking,
  deleteBooking,
} from "../../../redux/actions/booking-action";
import Room from "../../room-card/Room";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
import { FormButton } from "../../shared-components/Button/Button";
import styles from "../../common.module.css";
import Modal from "../../shared-components/Modal/Modal";
import ConfirmationModal from "../../shared-components/ConfirmationModal/ConfirmationModal";
import DashboardContainer from '../DashboardContainer/DashboardContainer'

// FORM REDUCER

const VALUE_CHANGE = "VALUE_CHANGE";

const formReducer = (state, action) => {
  switch (action.type) {
    case VALUE_CHANGE:
      return {
        ...state,
        [action.input]: action.value,
      };
    default:
      return state;
  }
};

const ListBooking = (props) => {
  const { fetchBookings, removeBooking } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    additionalPayment: "",
    customerBookingStatus: "",
    checkInDate: "",
    checkoutDate: "",
  });

  const handleOpenModal = (booking) => {
    setIsModalOpen((prevState) => !prevState);
    if (booking) {
      setActiveBookingId(booking.id);
      setModalTitle(booking.customer_name);
      dispatchFormState({
        type: VALUE_CHANGE,
        input: "customerBookingStatus",
        value: booking.customer_booking_status,
      });

      dispatchFormState({
        type: VALUE_CHANGE,
        input: "checkInDate",
        value: booking.actual_check_in_date || booking.expected_check_in_date,
      });

      dispatchFormState({
        type: VALUE_CHANGE,
        input: "checkoutDate",
        value: booking.actual_checkout_date || booking.expected_checkout_date,
      });
      dispatchFormState({
        type: VALUE_CHANGE,
        input: "additionalPayment",
        value: "",
      });
    }
  };

  const deleteBookingHandler = async () => {
    await removeBooking(activeBookingId);
    setShowConfirmation(false);
  };

  const deleteConfirmationHandler = (bookingId) => {
    setActiveBookingId(bookingId);
    setShowConfirmation(true);
  };

  const valueChangeHandler = useCallback(
    (event) => {
      dispatchFormState({
        type: VALUE_CHANGE,
        input: event.target.name,
        value: event.target.value,
      });
    },
    [dispatchFormState]
  );

  let rooms = <Spinner />;

  if (!props.loading) {
    rooms = props.bookings.map((booking) => (
      <Room
        {...booking}
        key={booking.id}
        bookings
        onClick={() => handleOpenModal(booking)}
        onDelete={() => deleteConfirmationHandler(booking.id)}
      />
    ));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    await props.updateBooking(activeBookingId, formState);
    await props.fetchBookings();
    handleOpenModal();
  };

  const {
    checkInDate,
    checkoutDate,
    customerBookingStatus,
    additionalPayment,
  } = formState;

  return (
    <React.Fragment>


      <DashboardContainer>
        <h3 className={styles.PageHeading}>Available Bookings</h3>
        <div className={classes.BookingContainer}>{rooms}</div>
      </DashboardContainer>


      <ConfirmationModal
        open={showConfirmation}
        cancel={() => setShowConfirmation(false)}
        continue={deleteBookingHandler}
      >
        Are you sure you want to delete this booking?
      </ConfirmationModal>
      <Modal open={isModalOpen} onToggle={handleOpenModal}>
        <div className="row">
          <div className="col-md-8 offset-2">
            <h3 className={styles.PageHeading}>
              MANAGE BOOKING BY {modalTitle}
            </h3>
            <form onSubmit={submitHandler} method="post">
              <TextInput
                placeholder="Additional payment"
                value={additionalPayment}
                name="additionalPayment"
                onChange={valueChangeHandler}
              />
              <SelectInput
                options={[
                  { value: "Booked", label: "Booked" },
                  { value: "Check in", label: "Check in" },
                  { value: "Checkout", label: "Checkout" },
                ]}
                value={customerBookingStatus}
                onChange={valueChangeHandler}
                name="customerBookingStatus"
              />
              <TextInput
                placeholder="Check in date"
                type="date"
                value={checkInDate}
                onChange={valueChangeHandler}
                name="checkInDate"
              />

              <TextInput
                placeholder="Checkout date"
                type="date"
                value={checkoutDate}
                onChange={valueChangeHandler}
                name="checkoutDate"
              />

              <FormButton loading={props.loading}>Save changes</FormButton>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  bookings: state.booking.bookings,
  loading: state.booking.loading,
  error: state.booking.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBookings: () => dispatch(getBookings()),
  updateBooking: (id, data) => dispatch(editBooking(id, data)),
  removeBooking: (id) => dispatch(deleteBooking(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooking);
