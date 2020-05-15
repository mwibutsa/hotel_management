import { toSnakeCase } from "../../helper-functions";
import axios from "../../axios";

import {
  UPDATE_HOTEL_CLIENT,
  UPDATE_HOTEL_CLIENT_BEGIN,
  UPDATE_HOTEL_CLIENT_FAILED,
  FETCH_HOTEL_CLIENTS,
  FETCH_HOTEL_CLIENTS_BEGIN,
  FETCH_HOTEL_CLIENTS_FAILED,
  DELETE_HOTEL_CLIENT,
  DELETE_HOTEL_CLIENT_BEGIN,
  DELETE_HOTEL_CLIENT_FAILED,
} from "./action-types";

// FETCH HOTEL CLIENTS

const fetchHotelClientsBegin = () => ({ type: FETCH_HOTEL_CLIENTS_BEGIN });

const fetchClientsHotelDone = (data, id) => ({
  type: FETCH_HOTEL_CLIENTS,
  payload: { data, id },
});

const fetchHotelClientsFailed = (error) => ({
  type: FETCH_HOTEL_CLIENTS_FAILED,
  paylod: { error },
});

export const fetchHotelClients = () => async (dispatch) => {
  try {
    dispatch(fetchHotelClientsBegin());
    const { data } = await axios.get("/hotel-clients/clients/");
    dispatch(fetchClientsHotelDone(data));
  } catch (error) {
    dispatch(fetchHotelClientsFailed(error));
  }
};

// UPDATE HOTEL CLIENTS

const updateHotelClientBegin = () => ({ type: UPDATE_HOTEL_CLIENT_BEGIN });

const udpateHotelClientDone = (data, id) => ({
  type: UPDATE_HOTEL_CLIENT,
  payload: { data, id },
});

const updateHotelClientFailed = (error) => ({
  type: UPDATE_HOTEL_CLIENT_FAILED,
  payload: { error },
});

export const updateHotelClient = (clientInfo) => async (dispatch) => {
  try {
    const client = {};

    for (let [key, value] of Object.entries(clientInfo)) {
      if (value) {
        client[toSnakeCase(key)] = value;
      }
    }
    dispatch(updateHotelClientBegin());
    const { data } = await axios.patch(
      `/hotel-clients/clients/${client.id}`,
      client
    );
    dispatch(udpateHotelClientDone(data, client.id));
  } catch (error) {
    dispatch(updateHotelClientFailed(error));
  }
};

// DELETE HOTEL CLIENT

const deleteHotelClientBegin = () => ({ type: DELETE_HOTEL_CLIENT_BEGIN });

const deleteHotelClientDone = (data, id) => ({
  type: DELETE_HOTEL_CLIENT,
  payload: { data, id },
});

const deleteHotelClientFailed = (error) => ({
  type: DELETE_HOTEL_CLIENT_FAILED,
  payload: { error },
});

export const deleteHotelClient = (id) => async (dispatch) => {
  try {
    dispatch(deleteHotelClientBegin());
    const { data } = await axios.delete(`/hotel-clients/clients/${id}`);
    dispatch(deleteHotelClientDone(data, id));
  } catch (error) {
    dispatch(deleteHotelClientFailed(error));
  }
};
