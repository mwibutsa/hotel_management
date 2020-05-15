import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useRef,
} from "react";
import ReactToPrint from "react-to-print";
import classes from "./HotelClientPage.module.css";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import styles from "../../common.module.css";
import Client from "../../shared-components/Card/Card";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import { CardButton, FormButton } from "../../shared-components/Button/Button";
import {
  fetchHotelClients,
  updateHotelClient,
  deleteHotelClient,
} from "../../../redux/actions/client-action";

import {
  fetchClientExpenses,
  udpateClientExpense,
  addClientExpense,
  deleteClientExpense,
} from "../../../redux/actions/client-expenses-action";

import Input from "../../shared-components/TextInput/TextInput";
import Modal from "../../shared-components/Modal/Modal";
import { toCamelCase, calculateRoomBills } from "../../../helper-functions";
import Table from "../../shared-components/Table/Table";

const VALUE_CHANGE = "VALUE_CHANGE";

const formReducer = (state, action) => {
  switch (action.type) {
    case VALUE_CHANGE:
      return {
        ...state,
        [action.input]: action.value,
      };
    default:
      return state;
  }
};

const HotelClientPage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClientId, setActiveClientId] = useState(0);
  const [showBills, setShowBills] = useState(false);
  const billDetails = useRef(null);
  const [activeClientBooking, setActiveClientBooking] = useState({});
  // FORM STATE & DISPATCHER

  const [formState, dispatchFormState] = useReducer(formReducer, {
    email: "",
    firstName: "",
    lastName: "",
    isCheckedIn: true,
    identificationNumber: "",
    phoneNumber: "",
  });

  const [billFormState, dispatcBillFormState] = useReducer(formReducer, {
    name: "",
    quantity: 0,
    price: 0,
  });

  const billValueChangeHandler = useCallback(
    (event) => {
      dispatcBillFormState({
        type: VALUE_CHANGE,
        input: event.target.name,
        value: event.target.value,
      });
    },
    [dispatcBillFormState]
  );

  const valueChangeHandler = useCallback(
    (event) => {
      dispatchFormState({
        type: VALUE_CHANGE,
        input: event.target.name,
        value: event.target.value,
      });
    },
    [dispatchFormState]
  );
  // LOAD HOTEL CLIENTS
  const {
    loadClients,
    updateClient,
    loadClientExpenses,
    addExpenses,
    updateExpense,
  } = props;
  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // TOGLE MODEL HANDLER

  const handleOpenModal = (client = null) => {
    setIsModalOpen((prevState) => !prevState);
    if (client) {
      for (let [key, value] of Object.entries(client)) {
        dispatchFormState({
          type: VALUE_CHANGE,
          input: toCamelCase(key),
          value: value,
        });
      }
    }
  };

  const showBillsHandler = async (clientId = null) => {
    if (typeof clientId === typeof 1) {
      await loadClientExpenses(clientId);

      const client = props.clients.find((client) => client.id === clientId);

      let booking = {};
      if (client) {
        booking = client.bookings ? client.bookings[0] : {};
      }
      setActiveClientBooking(booking);
    }
    setActiveClientId(clientId);
    setShowBills((prevState) => !prevState);
  };

  const checkChangeHandler = useCallback(
    (event) => {
      dispatchFormState({
        type: VALUE_CHANGE,
        input: event.target.name,
        value: event.target.checked,
      });
    },
    [dispatchFormState]
  );

  // PAY EXPENSE HANDLER

  const payExpenseHandler = async (id) => {
    await updateExpense({ id, is_paid: true });
  };
  // TOTAL CLIENT BILLS

  const handleSumBills = (expenses) => {
    const sum = expenses.reduce((sum, expense) => {
      sum += expense.quantity * expense.price;
      return sum;
    }, 0);

    const roomBills = calculateRoomBills(activeClientBooking);

    let totalBills = sum;

    if (roomBills) {
      totalBills += roomBills;
    }

    return [totalBills, roomBills];
  };
  // SUBMIT HANDLER

  // HANDLE ADD BILLS
  const handleAddBillRecord = async (event) => {
    event.preventDefault();

    await addExpenses(activeClientId, billFormState);

    for (let key of Object.keys(billFormState)) {
      dispatcBillFormState({
        type: VALUE_CHANGE,
        input: key,
        value: "",
      });
    }
  };
  const clientUpdateHandler = async (event) => {
    event.preventDefault();
    await updateClient(formState);
    handleOpenModal();
  };

  // SHOW LOADER WHEN DATA IS NOT AVAILABLE YET

  let content = <Spinner></Spinner>;

  if (!props.loading) {
    content = props.clients.map((client) => {
      return (
        <Client
          title={client.first_name}
          value={client}
          key={client.created_at}
        >
          <CardButton onClick={() => handleOpenModal(client)}>Edit</CardButton>
          <CardButton onClick={() => showBillsHandler(client.id)}>
            Show Bills
          </CardButton>
        </Client>
      );
    });
  }

  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    identificationNumber,
    isCheckedIn,
  } = formState;

  const { name, quantity, price } = billFormState;
  return (
    <React.Fragment>
      <DashboardContainer>
        <h3 className={styles.PageHeading}>Hotel clients</h3>
        <div className={classes.ClientsContainer}>{content}</div>
      </DashboardContainer>

      {/* EDIT CLIENT MODAL */}

      <Modal open={isModalOpen} onToggle={handleOpenModal} title="Client info">
        <form method="POST" onSubmit={clientUpdateHandler}>
          <div className="row">
            <div className="col-md-8 offset-2">
              <h1 className={styles.PageHeading}>Update customer info</h1>
              <Input
                placeholder="Email"
                onChange={valueChangeHandler}
                type="email"
                name="email"
                value={email}
              />
              <Input
                placeholder="First name"
                onChange={valueChangeHandler}
                type="text"
                name="firstName"
                value={firstName}
              />
              <Input
                placeholder="Last name"
                onChange={valueChangeHandler}
                type="text"
                name="lastName"
                value={lastName}
              />
              <Input
                placeholder="Phone number"
                onChange={valueChangeHandler}
                type="text"
                name="phoneNumber"
                value={phoneNumber}
              />
              <Input
                placeholder="Passport/ ID"
                onChange={valueChangeHandler}
                type="text"
                name="identificationNumber"
                value={identificationNumber}
              />
              <div>
                <label className={classes.CheckboxLabel}>
                  Checked in:
                  <Input
                    type="checkbox"
                    name="isCheckedIn"
                    onChange={checkChangeHandler}
                    value={isCheckedIn}
                    className={classes.Checkbox}
                    required={false}
                  />
                </label>
              </div>
              <FormButton loading={props.loading}>Save changes</FormButton>
            </div>
          </div>
        </form>
      </Modal>

      {/* END OF EDIT CLIENT MODAL  */}

      {/* CLIENT BILLS MODAL */}

      <Modal
        open={showBills}
        onToggle={showBillsHandler}
        title="Client transaction details"
      >
        <div className="row">
          <div className="col-md-12 col-sm-12">
            {props.loadingExpenses && <Spinner />}
            {!props.loadingExpenses && props.expenses && (
              <Table
                reference={billDetails}
                values={props.expenses}
                tableCaption="Client consumption record"
                total={handleSumBills(props.expenses)}
                onClick={payExpenseHandler}
              ></Table>
            )}

            <div className={classes.BillForm}>
              <span>New record</span>
              <form method="POST" onSubmit={handleAddBillRecord}>
                <Input
                  name="name"
                  placeholder="Item name"
                  type="text"
                  onChange={billValueChangeHandler}
                  value={name}
                />
                <Input
                  name="price"
                  placeholder="Price per unit"
                  type="number"
                  onChange={billValueChangeHandler}
                  value={price}
                />
                <Input
                  name="quantity"
                  placeholder="Quantity"
                  type="number"
                  onChange={billValueChangeHandler}
                  value={quantity}
                />
                <div className={classes.ButtonContainer}>
                  <FormButton>Add</FormButton>
                </div>
              </form>
            </div>
            <div className={classes.PrintButtonContainer}>
              <ReactToPrint
                trigger={() => <CardButton>Print bill</CardButton>}
                content={() => billDetails.current}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* END OF CLIENT BILLS MODAL */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  clients: state.hotelClient.hotelClients,
  loading: state.hotelClient.loading,
  error: state.hotelClient.error,
  expenses: state.clientExpenses.expenses,
  loadingExpenses: state.clientExpenses.loading,
  expenseError: state.clientExpenses.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadClients: () => dispatch(fetchHotelClients()),
  updateClient: (data) => dispatch(updateHotelClient(data)),
  deleteClient: (id) => dispatch(deleteHotelClient(id)),
  loadClientExpenses: (id) => dispatch(fetchClientExpenses(id)),
  addExpenses: (id, data) => dispatch(addClientExpense(id, data)),
  updateExpense: (data) => dispatch(udpateClientExpense(data)),
  deleteExpense: (id) => dispatch(deleteClientExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelClientPage);
