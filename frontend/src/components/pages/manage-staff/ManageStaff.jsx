import React, { useEffect, useState, useReducer, useCallback } from "react";
import classes from "./ManageStaff.module.css";
import SideNavigation from "../../side-navigation/SideNavigation";
import TextInput from "../../shared-components/TextInput/TextInput";
import { FormButton } from "../../shared-components/Button/Button";
import StaffMember from "./StaffMember/StaffMember";
import { loadStaff } from "../../../redux/actions/staff-action";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import styles from "../../common.module.css";
import Modal from "../../shared-components/Modal/Modal";

const VALUE_CHANGE = "VALUE_CHANGE";

const formReducer = (state, action) => {
  switch (action.type) {
    case VALUE_CHANGE:
      return { ...state, [action.input]: action.value };
    default:
      return state;
  }
};

const ManageStaff = (props) => {
  const { loadStaffMembers, loading, error } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editableStaff, setEditableStaff] = useState({});

  useEffect(() => {
    loadStaffMembers();
  }, [loadStaffMembers]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    is_staff: true,
    username: "",
  });
  const valueChangeHandler = useCallback((event) => {
    dispatchFormState({
      type: VALUE_CHANGE,
      input: event.target.name,
      value: event.target.value,
    });
  });

  const { email, username, firstName, lastName, password } = formState;

  const toggleModalHandler = (staff = null) => {
    setIsModalOpen((prevState) => !prevState);
    if (staff) {
      dispatchFormState({
        input: "firstName",
        value: staff.first_name,
        type: VALUE_CHANGE,
      });
      dispatchFormState({
        input: "lastName",
        value: staff.last_name,
        type: VALUE_CHANGE,
      });
      dispatchFormState({
        input: "email",
        value: staff.email,
        type: VALUE_CHANGE,
      });
      dispatchFormState({
        input: "username",
        value: staff.username,
        type: VALUE_CHANGE,
      });
    }
  };
  const staffClickHandler = (staff) => {
    setIsCreating(false);
    setEditableStaff(staff);
    toggleModalHandler(staff);
  };

  // SUBMIT HANDLER

  const addMemberHandler = (event) => {
    event.preventDefault();
  };

  const handleAddButtonClick = () => {
    setIsCreating(true);
    toggleModalHandler();
  };

  // LOGICAL RENDERING
  let staffMembers = <Spinner />;
  if (!props.loading) {
    staffMembers = props.staffMembers.map((staff) => (
      <StaffMember
        {...staff}
        key={staff.id}
        onClick={() => staffClickHandler(staff)}
      />
    ));
  }

  return (
    <div className={classes.ManageStaffPage}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideNavigation />
          </div>
          <div className="col-md-7">
            <br></br>
            <h1 className={styles.PageHeading}>Manage staff</h1>
            <FormButton onClick={handleAddButtonClick}>New member</FormButton>
            <div className="row">{staffMembers}</div>
          </div>
        </div>
      </div>

      {/*Modal form*/}

      <Modal open={isModalOpen} onToggle={toggleModalHandler}>
        <form onSubmit={() => {}}>
          <div className="row">
            <h1 className={[styles.TextCenter, styles.PageHeading].join(" ")}>
              {isCreating
                ? "Add a new staff member"
                : `Edit ${editableStaff.email}`}
            </h1>
            <div className="col-md-8 offset-2">
              <TextInput
                placeholder="First name"
                name="firstName"
                onChange={valueChangeHandler}
                value={firstName}
              />
              <TextInput
                placeholder="Last name"
                name="lastName"
                onChange={valueChangeHandler}
                value={lastName}
              />
              <TextInput
                placeholder="Email"
                type="email"
                name="email"
                onChange={valueChangeHandler}
                value={email}
              />
              <TextInput
                placeholder="Username"
                name="username"
                onChange={valueChangeHandler}
                value={username}
              />
              <TextInput
                placeholder="Password"
                type="password"
                name="password"
                onChange={valueChangeHandler}
                value={password}
              />
              <div className={styles.TextCenter}>
                <FormButton>Save</FormButton>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  staffMembers: state.staff.staffMembers,
  loading: state.staff.loading,
  error: state.staff.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadStaffMembers: () => dispatch(loadStaff()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
