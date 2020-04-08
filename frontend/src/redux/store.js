import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import bookingReducer from "../redux/reducers/booking-reducer";

import roomReducer from "../redux/reducers/room-reducer";

const middleware = [thunk];

const baseReducer = combineReducers({
  booking: bookingReducer,
  rooms: roomReducer,
});

const store = createStore(
  baseReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
