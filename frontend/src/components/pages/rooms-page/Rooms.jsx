import React, { useState, useEffect, useReducer, useCallback } from "react";
import SideNavigation from "../../side-navigation/SideNavigation";
import classes from "./Rooms.module.css";
import Room from "../../room-card/Room";
import {
  getRooms,
  editRoom,
  addRoom,
  deleteRoom,
} from "../../../redux/actions/room-action";
import { fetchRoomCategories } from "../../../redux/actions/room-category-action";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import { FormButton } from "../../shared-components/Button/Button";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
import { toCamelCase } from "../../../helper-functions";
import Modal from "../../shared-components/Modal/Modal";
import ConfirmationModal from "../../shared-components/ConfirmationModal/ConfirmationModal";

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
  const [activeRoom, setActiveRoom] = useState({});
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // FETCH ROOMS ON PAGE LOAD

  const { fetchRooms, getCategories, removeRoom } = props;

  useEffect(() => {
    fetchRooms();
    getCategories();
  }, [fetchRooms, getCategories]);

  // FORM STATE REDUCER HOOK
  const [formState, dispatchFormSate] = useReducer(formReducer, {
    roomCategory: "",
    price: "",
    roomStatus: "",
    roomNumber: "",
  });

  // HANDLE OPEN MODAL
  const handleOpenModal = (room) => {
    if (room) {
      setActiveRoom(room);
      setIsAddingRoom(false);
      for (let [key, value] of Object.entries(room)) {
        console.log(toCamelCase(key), "KEY");
        dispatchFormSate({
          type: VALUE_CHANGE,
          input: toCamelCase(key),
          value: value,
        });
      }
    }
    setIsModalOpen((prevState) => !prevState);
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
    await props.updateRoom(activeRoom.id, formState);
    setIsModalOpen(false);
  };

  const deleteRoomHandler = async () => {
    await removeRoom(activeRoom.id);
    setShowConfirmation(false);
  };

  const addRoomHandler = async (event) => {
    event.preventDefault();
    const { roomCategory, price, roomNumber } = formState;

    setIsAddingRoom(false);

    await props.addRoom({ roomCategory, price, roomNumber });
    handleOpenModal();
  };

  const deleteConfirmationHandler = (room) => {
    setActiveRoom(room);
    setShowConfirmation(true);
  };
  let roomContent = <Spinner />;

  if (!props.loading) {
    roomContent = props.rooms.map((room) => (
      <Room
        onClick={() => handleOpenModal(room)}
        onDelete={() => deleteConfirmationHandler(room)}
        {...room}
        key={room.room_number}
        rooms
      />
    ));
  }

  const { roomCategory, price, roomStatus, roomNumber } = formState;
  const roomCategories = [];

  if (!props.loading) {
    props.roomCategories.forEach((category) => {
      roomCategories.push({
        value: category.category_name,
        label: category.category_name,
      });
    });
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

            <FormButton
              onClick={() => {
                setActiveRoom({});
                setIsAddingRoom(true);
                handleOpenModal();
              }}
            >
              New room
            </FormButton>
            <div className={classes.RoomsContainer}>{roomContent}</div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={showConfirmation}
        cancel={() => setShowConfirmation(false)}
        continue={deleteRoomHandler}
      >
        Are you sure you want to delete this room?
      </ConfirmationModal>
      <Modal open={isModalOpen} onToggle={handleOpenModal}>
        <div className="row">
          <div className="col-md-8 offset-2">
            <h3 className={classes.EditRoomHeading}>
              {isAddingRoom && "ADD A NEW  ROOM"}

              {!isAddingRoom && `MANAGE ROOM ${activeRoom.room_number}`}
            </h3>
            {!isAddingRoom && (
              <form onSubmit={editRoomHandler}>
                <SelectInput
                  options={roomCategories}
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
                <FormButton loading={props.loading}>Save changes</FormButton>
              </form>
            )}

            {isAddingRoom && (
              <form method="post" onSubmit={addRoomHandler}>
                <SelectInput
                  options={roomCategories}
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
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
  loading: state.rooms.loading,
  roomCategories: state.roomCategory.roomCategories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRooms: () => dispatch(getRooms()),
  updateRoom: (id, data) => dispatch(editRoom(id, data)),
  addRoom: (data) => dispatch(addRoom(data)),
  getCategories: () => dispatch(fetchRoomCategories()),
  removeRoom: (id) => dispatch(deleteRoom(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
