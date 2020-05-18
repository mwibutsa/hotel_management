import {
  FETCH_CLIENT_EXPENSES_BEGIN,
  FETCH_CLIENT_EXPENSES,
  FETCH_CLIENT_EXPENSES_FAILED,
  ADD_CLIENT_EXPENSE,
  ADD_CLIENT_EXPENSE_BEGIN,
  ADD_CLIENT_EXPENSE_FAILED,
  UPDATE_CLIENT_EXPENSE,
  UPDATE_CLIENT_EXPENSE_BEGIN,
  UPDATE_CLIENT_EXPENSE_FAILED,
  DELETE_CLIENT_EXPENSE,
  DELETE_CLIENT_EXPENSE_BEGIN,
  DELETE_CLIENT_EXPENSE_FAILED,
} from "../actions/action-types";
import { deleteArrayById } from "../../helper-functions";

const initialState = {
  loading: false,
  expenses: [],
  errors: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CLIENT_EXPENSES_BEGIN:
      return { ...state, loading: true, error: null };

    case FETCH_CLIENT_EXPENSES:
      return { ...state, loading: false, expenses: payload.data };

    case FETCH_CLIENT_EXPENSES_FAILED:
      return { ...state, loading: false, error: payload.error };

    case UPDATE_CLIENT_EXPENSE_BEGIN:
      return { ...state, loading: true, error: null };
    case UPDATE_CLIENT_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: deleteArrayById(state.expenses, payload.data.id),
      };
    case UPDATE_CLIENT_EXPENSE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case ADD_CLIENT_EXPENSE_BEGIN:
      return { ...state, loading: true, error: null };
    case ADD_CLIENT_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: state.expenses.concat(payload.data),
      };

    case ADD_CLIENT_EXPENSE_FAILED:
      return { ...state, loading: false, error: payload.error };

    case DELETE_CLIENT_EXPENSE_BEGIN:
      return { ...state, loading: true, error: null };
    case DELETE_CLIENT_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: deleteArrayById(state.expenses, payload.id),
      };
    case DELETE_CLIENT_EXPENSE_FAILED:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
