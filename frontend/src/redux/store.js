import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import bookingReducer from "../redux/reducers/booking-reducer";
import loginReducer from "../redux/reducers/login-reducer";
import roomReducer from "../redux/reducers/room-reducer";
import staffReducer from "../redux/reducers/staff-reducer";
import roomCategoryReducer from "../redux/reducers/room-category-reducer";
const middleware = [thunk];

const baseReducer = combineReducers({
  booking: bookingReducer,
  rooms: roomReducer,
  login: loginReducer,
  staff: staffReducer,
  roomCategory: roomCategoryReducer,
});

const store = createStore(
  baseReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
