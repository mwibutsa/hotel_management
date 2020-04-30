import React from "react";
import classes from "./StaffMember.module.css";

const Checkbox = (props) => (props.checked ? <span>&#10004; </span> : "x");

const getName = (firstName, lastName) => {
  console.log(firstName, lastName);
  const name =
    (firstName + lastName).length > 1
      ? `${firstName} ${lastName}`
      : "Click to add a name";

  return name;
};

const StaffMember = (props) => (
  <div
    className={["col-md-4 col-sm-12", classes.StaffMember].join(" ")}
    onClick={props.onClick}
  >
    <div className={classes.StaffAvatar}>
      <img src="https://via.placeholder.com/150" />
    </div>
    <div className={classes.Content}>
      <p>Name: {getName(props.first_name, props.last_name)}</p>
      <p>Email: {props.email}</p>
      <p>
        Is admin :
        <Checkbox checked={props.is_admin} className={classes.Checkbox} />
      </p>
      <p>
        Is Landlord : <Checkbox checked={props.is_landlord} />
      </p>
      <p>
        Is staff : <Checkbox checked={props.is_staff} />
      </p>
    </div>
  </div>
);

export default StaffMember;
