import {
  START_STAFF_FETCHING,
  FINISH_STAFF_FETCHING,
  STAFF_FETCHING_FAILED,
  ADD_STAFF_MEMBER,
  ADD_STAFF_MEMBER_BEGIN,
  ADD_STAFF_MEMBER_FAILED,
  EDIT_STAFF_MEMBER,
  EDIT_STAFF_MEMBER_BEGIN,
  EDIT_STAFF_MEMBER_FAILED,
  DEACTIVATE_STAFF,
  DEACTIVATE_STAFF_BEGIN,
  DEACTIVATE_STAFF_FAILED,
} from "./action-types";

import axios from "../../axios";
import { toSnakeCase } from "../../helper-functions";

// LOAD AVAILABLE STAFF MEMBERS

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

// ADD STAFF MEMBER

const addStaffMemberBegin = () => ({ type: ADD_STAFF_MEMBER_BEGIN });
const addStaffMemberSuccess = (data) => ({
  type: ADD_STAFF_MEMBER,
  payload: { data },
});

const addStaffMemberFailed = (error) => ({
  type: ADD_STAFF_MEMBER_FAILED,
  payload: { error },
});

export const addStaffMember = (newMember) => async (dispatch) => {
  try {
    dispatch(addStaffMemberBegin());
    const member = {};

    for (let [key, value] of Object.entries(newMember)) {
      member[toSnakeCase(key)] = value;
    }

    const { data } = await axios.post("/user/list/", member);
    dispatch(addStaffMemberSuccess(data));
  } catch (error) {
    dispatch(addStaffMemberFailed(error));
  }
};

// EDIT STAFF MEMBER

const editStaffMemberBegin = () => ({ type: EDIT_STAFF_MEMBER_BEGIN });
const editStaffMemberSuccess = (data) => ({
  type: EDIT_STAFF_MEMBER,
  payload: { data },
});

const editStaffMemberFailed = (error) => ({
  type: EDIT_STAFF_MEMBER_FAILED,
  payload: { error },
});

export const editStaffMember = (staffMember) => async (dispatch) => {
  try {
    dispatch(editStaffMemberBegin());
    const updatedStaff = {};

    for (let [key, value] of Object.entries(staffMember)) {
      if (value) {
        updatedStaff[toSnakeCase(key)] = value;
      }
    }

    const { data } = await axios.patch(
      `/user/list/${staffMember.id}`,
      updatedStaff
    );

    dispatch(editStaffMemberSuccess(data));
  } catch (error) {
    dispatch(editStaffMemberFailed(error));
  }
};

// DEACTIVATE STAFF MEMBER ACTIONS

const deactivateStaffBegin = () => ({ type: DEACTIVATE_STAFF_BEGIN });
const deactivateStaffDone = (data) => ({
  type: DEACTIVATE_STAFF,
  payload: { ...data },
});

const deactivateStaffFailed = (error) => ({
  type: DEACTIVATE_STAFF_FAILED,
  payload: { error },
});

export const deactivateStaffMember = (id) => async (dispatch) => {
  try {
    dispatch(deactivateStaffBegin());
    const { data } = await axios.delete(`/user/deactivate/${id}`);
    dispatch(deactivateStaffDone(data));
  } catch (error) {
    dispatch(deactivateStaffFailed(error));
  }
};
