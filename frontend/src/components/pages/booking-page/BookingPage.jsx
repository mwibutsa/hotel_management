import React, { Component } from "react";
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

class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        customerEmail: "",
        customerName: "",
        checkoutDate: "",
        checkInDate: "",
        roomType: 101,
      },
      isSuccessfull: false,
      successPayment: false,
      failedPayment: false,
      data: null,
      error: null,
    };
  }

  async componentDidMount() {
    await this.props.fetchRooms();
    this.setState({ rooms: this.props.rooms });
  }

  onChange = ({ target }) => {
    this.setState({
      form: { ...this.state.form, [target.name]: target.value },
    });
  };

  handleSuccessPayment = (data) => {
    this.setState({ successPayment: true, data });
  };

  handlePaymentFailure = (error) => {
    this.setState({ failedPayment: true, error: error });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const data = this.state.form;
    const { makeBooking } = this.props;
    await makeBooking(data);

    for (let key of Object.keys(this.state)) {
      if (key !== "customerEmail") this.setState({ [key]: "" });
    }
    if (!this.props.error) {
      this.setState({ isSuccessfull: true });
    }
  };

  render() {
    const {
      customerEmail,
      customerName,
      checkInDate,
      checkoutDate,
      roomType,
    } = this.state;

    let fetchStatus = (
      <div className={classes.RoomLoader}>
        <span>Select room</span> <BarSpinner />
      </div>
    );

    if (!this.props.loading) {
      const rooms = this.props.rooms.map((room) => ({
        value: room.room_number,
        label: room.room_number + "",
      }));
      fetchStatus = (
        <SelectInput
          name="roomType"
          placeholder="Room type"
          options={rooms}
          value={roomType}
          onChange={this.onChange}
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
            <form className={classes.Form} onSubmit={this.handleSubmit}>
              <TextInput
                placeholder="Full name"
                name="customerName"
                value={customerName}
                onChange={this.onChange}
              />

              <TextInput
                placeholder="E-mail"
                name="customerEmail"
                value={customerEmail}
                onChange={this.onChange}
              />
              <TextInput
                placeholder="Expected check in date"
                type="date"
                name="checkInDate"
                value={checkInDate}
                onChange={this.onChange}
              />

              <TextInput
                placeholder="Expected checkout date"
                type="date"
                name="checkoutDate"
                value={checkoutDate}
                onChange={this.onChange}
              />
              {fetchStatus}

              <p className={commonClasses.TextCenter}>
                <FormButton
                  loading={this.props.rooms.length && this.props.loading}
                >
                  Submit Booking
                </FormButton>
              </p>
            </form>
          </div>
        </div>
        <br />
      </div>
    );

    if (
      this.state.isSuccessfull &&
      !(this.state.successPayment || this.state.failedPayment)
    ) {
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
            customerEmail={this.state.customerEmail}
            onFailure={this.handlePaymentFailure}
            onSuccess={this.handleSuccessPayment}
          />
        </div>
      );
    } else if (this.state.successPayment) {
      content = (
        <div className={classes.SuccessContainer}>
          <p className={commonClasses.PageHeading}>
            You advance payment is successfull! we can't wait to see you at
            sweetlife hotel
          </p>
        </div>
      );
    } else if (this.state.failedPayment) {
      content = (
        <div className={classes.SuccessContainer}>
          <h3 className={commonClasses.PageHeading}>
            Something went wrong! make sure the email you provided matches the
            one used while booking a room
          </h3>
        </div>
      );
    }
    return <PageContainer>{content}</PageContainer>;
  }
}
const mapStateToProps = (state) => ({
  createdBooking: state.booking,
  rooms: state.rooms.rooms,
  loading: state.rooms.loading,
  error: state.booking.error,
});

const mapDispatchToProps = (dispatch) => ({
  makeBooking: (data) => dispatch(createBooking(data)),
  fetchRooms: () => dispatch(getRooms()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
