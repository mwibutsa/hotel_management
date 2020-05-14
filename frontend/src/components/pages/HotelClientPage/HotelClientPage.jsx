import React, { useEffect, useState, useReducer, useCallback } from "react";
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
import Input from "../../shared-components/TextInput/TextInput";
import Modal from "../../shared-components/Modal/Modal";
import { toCamelCase } from "../../../helper-functions";

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
  const [activeClient, setActiveClient] = useState({});

  // FORM STATE & DISPATCHER

  const [formState, dispatchFormState] = useReducer(formReducer, {
    email: "",
    firstName: "",
    lastName: "",
    isCheckedIn: true,
    identificationNumber: "",
    phoneNumber: "",
  });

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
  const { loadClients, updateClient } = props;
  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // TOGLE MODEL HANDLER

  const handleOpenModal = (client = null) => {
    setIsModalOpen((prevState) => !prevState);
    if (client) {
      setActiveClient(client);
      for (let [key, value] of Object.entries(client)) {
        dispatchFormState({
          type: VALUE_CHANGE,
          input: toCamelCase(key),
          value: value,
        });
      }
    }
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

  // SUBMIT HANDLER

  const clientUpdateHandler = async (event) => {
    event.preventDefault();
    await updateClient(formState);
    handleOpenModal();
  };
  // SHOW LOADER WHEN DATA IS NOT AVAILABLE YET
  let content = <Spinner></Spinner>;

  if (!props.loading) {
    content = props.clients.map((client) => {
      delete client.client_expenses;
      return (
        <Client
          title={client.first_name}
          value={client}
          key={client.created_at}
        >
          <CardButton onClick={() => handleOpenModal(client)}>Edit</CardButton>
          <CardButton> Bills</CardButton>
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

  return (
    <React.Fragment>
      <DashboardContainer>
        <h3 className={styles.PageHeading}>Hotel clients</h3>
        <div className={classes.ClientsContainer}>{content}</div>
      </DashboardContainer>
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
                  />
                </label>
              </div>
              <FormButton loading={props.loading}>Save changes</FormButton>
            </div>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  clients: state.hotelClient.hotelClients,
  loading: state.hotelClient.loading,
  error: state.hotelClient.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadClients: () => dispatch(fetchHotelClients()),
  updateClient: (data) => dispatch(updateHotelClient(data)),
  deleteClient: (id) => dispatch(deleteHotelClient(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelClientPage);
