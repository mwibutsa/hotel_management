import React, { useEffect, useState } from "react";
import classes from "./BookingList.module.css";
import SideNavigation from "../../side-navigation/SideNavigation";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import { getBookings } from "../../../redux/actions/booking-action";
import Room from "../../room-card/Room";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
import { FormButton } from "../../shared-components/Button/Button";
const ListBooking = (props) => {
  const { fetchBookings } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleOpenModal = (title = "") => {
    setIsModalOpen((prevState) => !prevState);
    setModalTitle(title);
  };

  let rooms = <Spinner />;

  if (!props.loading) {
    rooms = props.bookings.map((booking) => (
      <Room {...booking} key={booking.id} bookings onClick={handleOpenModal} />
    ));
  }

  return (
    <React.Fragment>
      <div className={classes.BookingListPage}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <SideNavigation />
            </div>
            <div className="col-md-7">
              <br />
              <h3>Available Bookings</h3>
              <div className={classes.BookingContainer}>{rooms}</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className={classes.EditRoomModalContainer}
          id="ModalContainer"
          onClick={(e) => {
            console.log(e.target.id);
            if (e.target.id === "ModalContainer") {
              handleOpenModal();
            }
          }}
        >
          <div className={classes.EditRoomModal}>
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-2">
                  <h3 className={classes.EditRoomHeading}>
                    MANAGE BOOKING BY {modalTitle}
                  </h3>
                  <form>
                    <TextInput placeholder="Additional payment" />
                    <SelectInput
                      options={[
                        { value: 1, label: "Booked" },
                        { value: 2, label: "Check in" },
                        { value: 3, label: "Checkout" },
                      ]}
                    />
                    <TextInput placeholder="Check in date" type="date" />
                    <TextInput placeholder="Checkout date" type="date" />

                    <FormButton>Save changes</FormButton>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooking);
