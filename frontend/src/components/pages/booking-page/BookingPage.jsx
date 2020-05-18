import React, { useCallback, useState, useEffect, useReducer } from "react";
import classes from "./BookingPage.module.css";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
import { FormButton } from "../../shared-components/Button/Button";
import commonClasses from "../../common.module.css";
import { connect } from "react-redux";
import { createBooking } from "../../../redux/actions/booking-action";
import { getRooms } from "../../../redux/actions/room-action";
import { BarSpinner } from "../../shared-components/Spinner/Spinner";
import PageContainer from "../../shared-components/PageContainer/PageContainer";

import StripeCheckout from "../../shared-components/StripeCheckout/StripeCheckout";

import { fetchRoomCategories } from "../../../redux/actions/room-category-action";
const VALUE_CHANGE = "VALUE_CHANGE";
const formReducer = (state, { type, input, value }) => {
  switch (type) {
    case VALUE_CHANGE:
      return {
        ...state,
        [input]: value,
      };
    default:
      return state;
  }
};

const BookingPage = (props) => {
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [successPayment, setSuccesspayment] = useState(false);
  const [failedPayment, setFailedPayment] = useState(false);
  const [roomCategory, setRoomCategory] = useState("Single");

  const { fetchRooms, fetchCategories } = props;
  const { search } = props.location;

  useEffect(() => {
    fetchRooms();
    fetchCategories();
  }, [fetchRooms, fetchCategories]);

  useEffect(() => {
    if (search.length) {
      const category = search.substr(1).split("=")[1];
      setRoomCategory(category);
    }
  }, [search]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    customerEmail: "",
    customerName: "",
    checkoutDate: "",
    checkInDate: "",
    roomType: 101,
  });

  const onChange = useCallback(
    ({ target }) => {
      dispatchFormState({
        type: VALUE_CHANGE,
        input: target.name,
        value: target.value,
      });
    },
    [dispatchFormState]
  );

  const handleSuccessPayment = (data) => {
    setSuccesspayment(true);
  };

  const handleCategoryChanged = (event) => {
    setRoomCategory(event.target.value);
    console.log(event.target.value);
  };

  const handlePaymentFailure = (error) => {
    setFailedPayment(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = formState;
    const { makeBooking } = props;
    await makeBooking(data);

    for (let key of Object.keys(formState)) {
      if (key !== "customerEmail")
        dispatchFormState({
          type: VALUE_CHANGE,
          input: key,
          value: "",
        });
    }
    if (!props.error) {
      setIsSuccessfull(true);
    }
  };

  const {
    customerEmail,
    customerName,
    checkInDate,
    checkoutDate,
    roomType,
  } = formState;

  let fetchStatus = (
    <div className={classes.RoomLoader}>
      <span>Select room</span> <BarSpinner />
    </div>
  );

  if (!props.loadCategories) {
    const category = props.roomCategories.find(
      (cat) => cat.category_name.toLowerCase() === roomCategory.toLowerCase()
    );
    let rooms = [];
    if (category) {
      rooms = category.rooms.map((room) => {
        return {
          value: room.room_number,
          label: room.room_number + "",
        };
      });
    } else {
      rooms = props.rooms.map((room) => {
        return {
          value: room.room_number,
          label: room.room_number + "",
        };
      });
    }

    fetchStatus = (
      <SelectInput
        name="roomType"
        placeholder="Room type"
        options={rooms}
        value={roomType}
        onChange={onChange}
      />
    );
  }

  let content = (
    <div className={["container", classes.BookingPage].join(" ")}>
      <h3 className={[commonClasses.PageHeading, classes.h3].join(" ")}>
        BOOK YOUR FAVORITE ROOM
      </h3>
      <div className="row">
        <div className="col-md-3  col-sm-12"></div>
        <div className="col col-sm-12   col-md-6">
          <form className={classes.Form} onSubmit={handleSubmit}>
            <TextInput
              placeholder="Full name"
              name="customerName"
              value={customerName}
              onChange={onChange}
            />

            <TextInput
              placeholder="E-mail"
              name="customerEmail"
              value={customerEmail}
              onChange={onChange}
            />
            <TextInput
              placeholder="Expected check in date"
              type="date"
              name="checkInDate"
              value={checkInDate}
              onChange={onChange}
            />

            <TextInput
              placeholder="Expected checkout date"
              type="date"
              name="checkoutDate"
              value={checkoutDate}
              onChange={onChange}
            />

            {props.roomCategories && (
              <SelectInput
                placeholder="Select room category"
                value={roomCategory}
                name="roomCategory"
                onChange={handleCategoryChanged}
                options={props.roomCategories.map((cat, index) => ({
                  label: cat.category_name,
                  value: cat.category_name,
                }))}
              />
            )}

            {fetchStatus}

            <p className={commonClasses.TextCenter}>
              <FormButton loading={props.rooms.length && props.loading}>
                Submit Booking
              </FormButton>
            </p>
          </form>
        </div>
      </div>
      <br />
    </div>
  );

  if (isSuccessfull && !(successPayment || failedPayment)) {
    content = (
      <div className={classes.SuccessContainer}>
        <br></br>
        <h3 className={commonClasses.PageHeading}>
          You Booking is is successfull
        </h3>

        <div className={classes.AdditionalMessage}>
          Kindly make at least a <span>$100</span> payment to confirm your
          booking
        </div>
        <br></br>
        <StripeCheckout
          name="Booking confirmation payment"
          description="Client's initial payment to take their booking seriously"
          amount={10000}
          customerEmail={customerEmail}
          onFailure={handlePaymentFailure}
          onSuccess={handleSuccessPayment}
        />
      </div>
    );
  } else if (successPayment) {
    content = (
      <div className={classes.SuccessContainer}>
        <p className={commonClasses.PageHeading}>
          You advance payment is successfull! we can't wait to see you at
          sweetlife hotel
        </p>
      </div>
    );
  } else if (failedPayment) {
    content = (
      <div className={classes.SuccessContainer}>
        <h3 className={commonClasses.PageHeading}>
          Something went wrong! make sure the email you provided matches the one
          used while booking a room
        </h3>
      </div>
    );
  }
  return <PageContainer>{content}</PageContainer>;
};

const mapStateToProps = (state) => ({
  createdBooking: state.booking,
  rooms: state.rooms.rooms,
  loading: state.rooms.loading,
  error: state.booking.error,
  roomCategories: state.roomCategory.roomCategories,
  loadCategories: state.roomCategory.loading,
  categoriesError: state.roomCategory.error,
});

const mapDispatchToProps = (dispatch) => ({
  makeBooking: (data) => dispatch(createBooking(data)),
  fetchRooms: () => dispatch(getRooms()),
  fetchCategories: () => dispatch(fetchRoomCategories()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
