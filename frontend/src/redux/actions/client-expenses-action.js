import { toSnakeCase } from "../../helper-functions";
import axios from "../../axios";
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
} from "./action-types";

// FETCH CLIENT EXPENSES

const fetchClientExpensesBegin = () => ({ type: FETCH_CLIENT_EXPENSES_BEGIN });

const fetchClientExpensesDone = (data) => ({
  type: FETCH_CLIENT_EXPENSES,
  payload: { data },
});

const fetchClientExpensesFailed = (error) => ({
  type: FETCH_CLIENT_EXPENSES_FAILED,
  payload: { error },
});

export const fetchClientExpenses = (clientId) => async (dispatch) => {
  try {
    dispatch(fetchClientExpensesBegin());
    const { data } = await axios.get(
      `/hotel-clients/clients/${clientId}/expenses/`
    );
    dispatch(fetchClientExpensesDone(data));
  } catch (error) {
    dispatch(fetchClientExpensesFailed(error));
  }
};

// ADD CLIENT EXPENSE

const addClientExpenseBegin = () => ({ type: ADD_CLIENT_EXPENSE_BEGIN });

const addClientExpenseDone = (data) => ({
  type: ADD_CLIENT_EXPENSE,
  payload: { data },
});

const addClientExpenseFailed = (error) => ({
  type: ADD_CLIENT_EXPENSE_FAILED,
  payload: { error },
});

export const addClientExpense = (clientId, expenseData) => async (dispatch) => {
  try {
    dispatch(addClientExpenseBegin());
    const expense = {};

    for (let [key, value] of Object.entries(expenseData)) {
      if (value) {
        expense[toSnakeCase(key)] = value;
      }
    }
    const { data } = await axios.post(
      `/hotel-clients/clients/${clientId}/expenses/`,
      expense
    );

    dispatch(addClientExpenseDone(data));
  } catch (error) {
    dispatch(addClientExpenseFailed(error));
  }
};

// UPDATE CLIENT EXPENSES

const updateClientExpenseBegin = () => ({ type: UPDATE_CLIENT_EXPENSE_BEGIN });
const udpateClientExpenseDone = (data) => ({
  type: UPDATE_CLIENT_EXPENSE,
  payload: { data },
});

const updateClientExpenseFailed = (error) => ({
  type: UPDATE_CLIENT_EXPENSE_FAILED,
  payload: { error },
});

export const udpateClientExpense = (expenseData) => async (dispatch) => {
  try {
    const expense = {};

    for (let [key, value] of Object.entries(expenseData)) {
      if (value) {
        expense[toSnakeCase(key)] = value;
      }
    }

    delete expense.id;
    dispatch(updateClientExpenseBegin());

    const { data } = await axios.patch(
      `/hotel-clients/expenses/${expenseData.id}`,
      expense
    );
    dispatch(udpateClientExpenseDone(data));
  } catch (error) {
    dispatch(updateClientExpenseFailed(error));
  }
};

// DELETE CLIENT EXPENSES

const deleteClientExpenseBegin = () => ({ type: DELETE_CLIENT_EXPENSE_BEGIN });

const deleteClientExpenseDone = (data, id) => ({
  type: DELETE_CLIENT_EXPENSE,
  payload: { data, id },
});

const deleteClientExpensesFailed = (error) => ({
  type: DELETE_CLIENT_EXPENSE_FAILED,
  payload: { error },
});

export const deleteClientExpense = (expenseId) => async (dispatch) => {
  try {
    dispatch(deleteClientExpenseBegin());
    const { data } = await axios.delete(`/hotel-clients/expenses/${expenseId}`);
    dispatch(deleteClientExpenseDone(data, expenseId));
  } catch (error) {
    dispatch(deleteClientExpensesFailed(error));
  }
};
