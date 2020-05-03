import axios from "../../axios";
import { toSnakeCase } from "../../helper-functions";
import {
  ADD_ROOM_CATEGORY,
  ADD_ROOM_CATEGORY_BEGIN,
  ADD_ROOM_CATEGORY_FAILED,
  EDIT_ROOM_CATEGORY,
  EDIT_ROOM_CATEGORY_BEGIN,
  EDIT_ROOM_CATEGORY_FAILED,
  FETCH_ROOM_CATEGORIES,
  FETCH_ROOM_CATEGORIES_BEGIN,
  FETCH_ROOM_CATEGORIES_FAILED,
} from "./action-types";

// CREATE A NEW ROOM CATEGORY

const addRoomCategoryBegin = () => ({ type: ADD_ROOM_CATEGORY_BEGIN });
const addRoomCategoryDone = (data) => ({
  type: ADD_ROOM_CATEGORY,
  payload: { data },
});

const addRoomCategoryFailed = (error) => ({
  type: ADD_ROOM_CATEGORY_FAILED,
  payload: { error },
});

export const addRoomCategory = (roomCategory) => async (dispatch) => {
  try {
    const category = {};

    for (let [key, value] of Object.entries(roomCategory)) {
      category[toSnakeCase(key)] = value;
    }

    dispatch(addRoomCategoryBegin());
    const { data } = await axios.post("/room/room-categories/", category);
    dispatch(addRoomCategoryDone(data));
  } catch (error) {
    console.log(error);
    dispatch(addRoomCategoryFailed(error));
  }
};

// FETCH ROOM CATEGORIES

const fetchRoomCategoriesBegin = () => ({ type: FETCH_ROOM_CATEGORIES_BEGIN });
const fetchRoomCategoriesDone = (data) => ({
  type: FETCH_ROOM_CATEGORIES,
  payload: { data },
});

const fetchRoomCategoriesFailed = (error) => ({
  type: FETCH_ROOM_CATEGORIES_FAILED,
  payload: { error },
});

export const fetchRoomCategories = () => async (dispatch) => {
  try {
    dispatch(fetchRoomCategoriesBegin());
    const { data } = await axios.get("/room/room-categories/");
    dispatch(fetchRoomCategoriesDone(data));
  } catch (error) {
    dispatch(fetchRoomCategoriesFailed(error));
  }
};

// EDIT AN EXISTING ROOM CATEGOYR

const editRoomCategoryBegin = () => ({
  type: EDIT_ROOM_CATEGORY_BEGIN,
});

const editRoomCategoryDone = (data) => ({
  type: EDIT_ROOM_CATEGORY,
  payload: { data },
});

const editRoomCategoryFailed = (error) => ({
  type: EDIT_ROOM_CATEGORY_FAILED,
  payload: { error },
});

export const editRoomCategory = (id, roomCategory) => async (dispatch) => {
  try {
    const category = {};
    console.log(id, "ID");

    for (let [key, value] of Object.entries(roomCategory)) {
      if (value !== null || value.trim() !== "") {
        category[toSnakeCase(key)] = value;
      }
    }

    dispatch(editRoomCategoryBegin());
    const { data } = await axios.patch(`/room/room-categories/${id}`, category);
    dispatch(editRoomCategoryDone(data));
  } catch (error) {
    dispatch(editRoomCategoryFailed(error));
  }
};
