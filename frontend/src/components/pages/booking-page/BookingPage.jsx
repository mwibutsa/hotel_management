import React, { Component } from "react";
import classes from "./BookingPage.module.css";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
import { FormButton } from "../../shared-components/Button/Button";
import commonClasses from "../../common.module.css";
import { connect } from "react-redux";
import { createBooking } from "../../../redux/actions/booking-action";
import { getRooms } from "../../../redux/actions/room-action";
import Spinner from "../../shared-components/Spinner/Spinner";
class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        customerEmail: "",
        customerName: "",
        checkoutDate: "",
        checkInDate: "",
        roomType: "",
      },
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

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.form;
    const { makeBooking } = this.props;
    makeBooking(data);

    for (let key of Object.keys(this.state)) {
      this.setState({ [key]: "" });
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

    let fetchStatus = <Spinner />;

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

    return (
      <div className={["container", classes.BookingPage].join(" ")}>
        <h3 className={classes.h3}>BOOK YOUR FAVORITE ROOM</h3>
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
                <FormButton>Submit Booking</FormButton>
              </p>
            </form>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  createdBooking: state.booking,
  rooms: state.rooms.rooms,
  loading: state.rooms.loading,
});

const mapDispatchToProps = (dispatch) => ({
  makeBooking: (data) => dispatch(createBooking(data)),
  fetchRooms: () => dispatch(getRooms()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
