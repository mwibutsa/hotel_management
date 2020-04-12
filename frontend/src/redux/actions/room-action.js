import { FETCH_ROOMS, BEGIN_FETCHING_ROOMS } from "./action-types";
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
    const { data } = await axios.get("/rooms/list-rooms/");
    dispatch(fetchRooms(data));
  } catch (err) {
    console.log(err);
  }
};
