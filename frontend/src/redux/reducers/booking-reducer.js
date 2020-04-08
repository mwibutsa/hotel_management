import { CREATE_BOOKING } from "../actions/action-types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_BOOKING:
      return { ...SVGMetadataElement, bookingData: { ...payload } };
    default:
      return state;
  }
};
