import React, { useEffect, useState, useReducer, useCallback } from "react";
import classes from "./ManageStaff.module.css";
import SideNavigation from "../../side-navigation/SideNavigation";
import TextInput from "../../shared-components/TextInput/TextInput";
import { FormButton } from "../../shared-components/Button/Button";
import StaffMember from "./StaffMember/StaffMember";
import {
  loadStaff,
  addStaffMember,
  editStaffMember,
} from "../../../redux/actions/staff-action";
import { connect } from "react-redux";
import Spinner from "../../shared-components/Spinner/Spinner";
import styles from "../../common.module.css";
import Modal from "../../shared-components/Modal/Modal";
import { toSnakeCase, toCamelCase } from "../../../helper-functions";
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
    isStaff: true,
    username: "",
    isAdmin: true,
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

  const checkChangeHandler = useCallback((event) => {
    dispatchFormState({
      type: VALUE_CHANGE,
      input: event.target.name,
      value: event.target.checked,
    });
  });
  const {
    email,
    username,
    firstName,
    lastName,
    password,
    isStaff,
    isAdmin,
  } = formState;

  const toggleModalHandler = (staff = null) => {
    console.log(staff);
    setIsModalOpen((prevState) => !prevState);
    if (staff) {
      for (let [key, value] of Object.entries(staff)) {
        console.log({ [toCamelCase(key)]: value });
        dispatchFormState({
          input: toCamelCase(key),
          value: value,
          type: VALUE_CHANGE,
        });
      }
    }
  };
  const staffClickHandler = (staff) => {
    setIsCreating(false);
    setEditableStaff(staff);
    toggleModalHandler(staff);
  };
  const handleAddButtonClick = () => {
    setIsCreating(true);
    toggleModalHandler();
  };

  // SUBMIT HANDLER

  const addMemberHandler = async (event) => {
    event.preventDefault();
    await props.addNewMember(formState);
  };

  const editStaffMemberHandler = async (event) => {
    event.preventDefault();
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
        <form onSubmit={addMemberHandler}>
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

              {!isCreating && (
                <div className={classes.UserPermissions}>
                  <div>
                    <label className={classes.CheckboxLabel}>
                      Is Staff:
                      <TextInput
                        type="checkbox"
                        name="isStaff"
                        onChange={checkChangeHandler}
                        value={isStaff}
                        className={classes.Checkbox}
                      />
                    </label>
                  </div>
                  <div>
                    <label className={classes.CheckboxLabel}>
                      Is Admin:
                      <TextInput
                        type="checkbox"
                        name="isAdmin"
                        onChange={checkChangeHandler}
                        value={isAdmin}
                        className={classes.Checkbox}
                      />
                    </label>
                  </div>
                </div>
              )}

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
  addNewMember: (data) => dispatch(addStaffMember(data)),
  updateMember: (data) => dispatch(editStaffMember(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
