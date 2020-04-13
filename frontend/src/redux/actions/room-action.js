import {
  FETCH_ROOMS,
  BEGIN_FETCHING_ROOMS,
  EDIT_ROOM_DONE,
  EDIT_ROOM_START,
  EDIT_ROOM_FAILED,
  ADD_ROOM_START,
  ADD_ROOM_DONE,
  ADD_ROOM_FAILED,
} from "./action-types";

import axios from "../../axios";

const beginFetchingRooms = () => {
  return { type: BEGIN_FETCHING_ROOMS };
};

const fetchRooms = (data) => {
  return { type: FETCH_ROOMS, payload: data };
};

export const getRooms = () => async (dispatch) => {
  try {
    dispatch(beginFetchingRooms());
    const { data } = await axios.get("/room/list-rooms/");
    dispatch(fetchRooms(data));
  } catch (err) {
    console.log(err);
  }
};

const addRoomStart = () => ({ type: ADD_ROOM_START });
const addRoomDone = (data) => ({ type: ADD_ROOM_DONE, payload: data });
const addRoomFailed = (error) => ({ type: ADD_ROOM_FAILED, error });

export const addRoom = (newRoom) => async (dispatch) => {
  try {
    const roomInfo = {
      room_number: newRoom.roomNumber,
      room_category: newRoom.roomCategory,
      price: newRoom.price
    }
    dispatch(addRoomStart());
    const { data } = await axios.post("/room/create-room/", roomInfo);
    dispatch(addRoomDone(data));
  } catch (error) {
    dispatch(addRoomFailed());
  }
};

const editRoomStart = () => ({ type: EDIT_ROOM_START });
const editRoomDone = (data) => ({ type: EDIT_ROOM_DONE, payload: data });
const editRoomFailed = (error) => ({ type: EDIT_ROOM_FAILED, error });

export const editRoom = (id, updatedRoom) => async (dispatch) => {
  try {
    dispatch(editRoomStart());

    const roomData = {
      room_number: parseInt(updatedRoom.roomNumber),
      room_category: updatedRoom.roomCategory,
      room_status: updatedRoom.roomStatus,
      price: parseFloat(updatedRoom.price),
    };

    const { data } = await axios.patch(`/room/list-rooms/${id}`, roomData);
    console.log(data);
    dispatch(editRoomDone(data));
  } catch (error) {
    dispatch(editRoomFailed(error));
    console.log(error);
  }
};
