import {
  START_STAFF_FETCHING,
  FINISH_STAFF_FETCHING,
  STAFF_FETCHING_FAILED,
} from "./action-types";

import axios from "../../axios";

const startStaffFetching = () => ({ type: START_STAFF_FETCHING });

const finishStaffFetching = (data) => ({
  type: FINISH_STAFF_FETCHING,
  payload: { data },
});

const staffFetchignFailed = (error) => ({
  type: STAFF_FETCHING_FAILED,
  payload: { error },
});

export const loadStaff = () => async (dispatch) => {
  try {
    dispatch(startStaffFetching());
    const { data } = await axios.get("/user/list/");
    dispatch(finishStaffFetching(data));
  } catch (error) {
    dispatch(staffFetchignFailed(error));
  }
};
