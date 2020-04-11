import React, { useState, useEffect } from "react";
import SideNavigation from "../../side-navigation/SideNavigation";
import classes from "./Rooms.module.css";
import Room from "../../room-card/Room";
import { getRooms } from "../../../redux/actions/room-action";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import { FormButton } from "../../shared-components/Button/Button";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
const RoomsPage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleOpenModal = (title = "") => {
    setIsModalOpen((prevState) => !prevState);
    setModalTitle(title);
  };

  const { fetchRooms } = props;

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  let rooms = <Spinner />;

  if (!props.loading) {
    rooms = props.rooms.map((room) => (
      <Room onClick={handleOpenModal} {...room} key={room.room_number} rooms />
    ));
  }

  return (
    <div className={classes.RoomsPage}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideNavigation />
          </div>
          <div className="col-md-7">
            <div className={classes.RoomPageMargin}></div>
            <h3 className={classes.RoomPageHeading}>Manage hotel Rooms</h3>
            <div className={classes.RoomsContainer}>{rooms}</div>
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
                    MANAGE ROOM {modalTitle}
                  </h3>
                  <form>
                    <SelectInput
                      options={[
                        { value: 1, label: "Single" },
                        { value: 2, label: "Twin" },
                        { value: 3, label: "Gold" },
                      ]}
                    />
                    <TextInput />
                    <SelectInput
                      options={[
                        { value: 1, label: "Available" },
                        { value: 2, label: "Booked" },
                        { value: 3, label: "In use" },
                      ]}
                    />
                    <FormButton>Save changes</FormButton>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
  loading: state.rooms.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRooms: () => dispatch(getRooms()),
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
