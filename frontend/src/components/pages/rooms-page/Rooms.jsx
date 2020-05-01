import React, { useState, useEffect, useReducer, useCallback } from "react";
import SideNavigation from "../../side-navigation/SideNavigation";
import classes from "./Rooms.module.css";
import Room from "../../room-card/Room";
import {
  getRooms,
  editRoom,
  addRoom,
} from "../../../redux/actions/room-action";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import { FormButton } from "../../shared-components/Button/Button";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";

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

const RoomsPage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({});
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  // FETCH ROOMS ON PAGE LOAD

  const { fetchRooms } = props;

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // FORM STATE REDUCER HOOK
  const [formState, dispatchFormSate] = useReducer(formReducer, {
    roomCategory: "",
    price: "",
    roomStatus: "",
    roomNumber: "",
  });

  // HANDLE OPEN MODAL
  const handleOpenModal = (room) => {
    setIsModalOpen((prevState) => !prevState);
    setCurrentRoom(room);

    if (room) {
      dispatchFormSate({
        type: VALUE_CHANGE,
        input: "price",
        value: room.price,
      });

      dispatchFormSate({
        type: VALUE_CHANGE,
        input: "roomStatus",
        value: room.room_status,
      });

      dispatchFormSate({
        type: VALUE_CHANGE,
        input: "roomNumber",
        value: room.room_number,
      });

      dispatchFormSate({
        type: VALUE_CHANGE,
        input: "roomCategory",
        value: room.room_category,
      });
    }
  };

  // INPUT CHANGE HANDLER

  const inputChangeHandler = useCallback(
    (event) => {
      dispatchFormSate({
        type: VALUE_CHANGE,
        input: event.target.name,
        value: event.target.value,
      });
    },
    [dispatchFormSate]
  );

  // HANDLE FORM SUBMISSION

  const editRoomHandler = async (event) => {
    event.preventDefault();
    setIsAddingRoom(false);
    await props.updateRoom(currentRoom.id, formState);
    setIsModalOpen(false);
  };

  const addRoomHandler = async (event) => {
    event.preventDefault();
    const { roomCategory, price, roomNumber } = formState;

    setIsAddingRoom(false);

    await props.addRoom({ roomCategory, price, roomNumber });
    handleOpenModal();
  };

  let roomContent = <Spinner />;

  if (!props.loading) {
    roomContent = props.rooms.map((room) => (
      <Room onClick={handleOpenModal} {...room} key={room.room_number} rooms />
    ));
  }

  const { roomCategory, price, roomStatus, roomNumber } = formState;

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

            <FormButton
              onClick={() => {
                setIsAddingRoom((prevState) => !prevState);
                setIsModalOpen((prevState) => !prevState);
              }}
            >
              New room
            </FormButton>
            <div className={classes.RoomsContainer}>{roomContent}</div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className={classes.EditRoomModalContainer}
          id="ModalContainer"
          onClick={(e) => {
            if (e.target.id === "ModalContainer") {
              handleOpenModal();
              setIsAddingRoom(false);
            }
          }}
        >
          <div className={classes.EditRoomModal}>
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-2">
                  <h3 className={classes.EditRoomHeading}>
                    {isAddingRoom && "ADD A NEW  ROOM"}

                    {!isAddingRoom && `MANAGE ROOM ${currentRoom.room_number}`}
                  </h3>
                  {!isAddingRoom && (
                    <form onSubmit={editRoomHandler}>
                      <SelectInput
                        options={[
                          { value: "single", label: "Single" },
                          { value: "twin", label: "Twin" },
                          { value: "gold", label: "Gold" },
                        ]}
                        value={roomCategory}
                        onChange={inputChangeHandler}
                        name="roomCategory"
                      />
                      <TextInput
                        placeholder="Room price"
                        value={price}
                        onChange={inputChangeHandler}
                        name="price"
                      />
                      <TextInput
                        placeholder="Room number"
                        value={roomNumber}
                        onChange={inputChangeHandler}
                        name="roomNumber"
                      />
                      <SelectInput
                        options={[
                          { value: "AVAILABLE", label: "Available" },
                          { value: "BOOKED", label: "Booked" },
                          { value: "IN_USE", label: "In use" },
                        ]}
                        onChange={inputChangeHandler}
                        value={roomStatus}
                        name="roomStatus"
                      />
                      <FormButton loading={props.loading}>
                        Save changes
                      </FormButton>
                    </form>
                  )}

                  {isAddingRoom && (
                    <form method="post" onSubmit={addRoomHandler}>
                      <SelectInput
                        options={[
                          { value: "single", label: "Single" },
                          { value: "twin", label: "Twin" },
                          { value: "gold", label: "Gold" },
                        ]}
                        value={roomCategory}
                        onChange={inputChangeHandler}
                        name="roomCategory"
                      />
                      <TextInput
                        placeholder="Room price"
                        value={price}
                        onChange={inputChangeHandler}
                        name="price"
                      />
                      <TextInput
                        placeholder="Room number"
                        value={roomNumber}
                        onChange={inputChangeHandler}
                        name="roomNumber"
                      />

                      <FormButton loading={props.loading}>Save</FormButton>
                    </form>
                  )}
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
  updateRoom: (id, data) => dispatch(editRoom(id, data)),
  addRoom: (data) => dispatch(addRoom(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
