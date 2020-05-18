import React from "react";
import classes from "./StaffMember.module.css";

const Permission = (props) => (
  <span
    className={[
      classes.Permission,
      props.deactivated ? classes.Inactive : "",
    ].join(" ")}
  >
    {props.children}
  </span>
);

const getName = (firstName, lastName) => {
  const name =
    (firstName + lastName).length > 1
      ? `${firstName} ${lastName}`
      : "Click to add a name";

  return name;
};

const StaffMember = (props) => (
  <div className="col-md-3 col-sm-12">
    <div className={classes.StaffMember}>
      <div className={classes.StaffAvatar}>
        <img src="https://via.placeholder.com/150" alt="" />
      </div>
      <div className={classes.AccountDetails}>
        <div onClick={props.onClick}>
          <div
            className={[
              classes.Content,
              props.is_active ? classes.CardNormal : classes.CardInactive,
            ].join(" ")}
          >
            <div className={classes.AccountInfo}>
              <p>Name: {getName(props.first_name, props.last_name)}</p>
              <p>Email: {props.email}</p>
            </div>
            <div className={classes.PermissionGroup}>
              <span className={classes.PermissionHeading}>Permissions</span>
              {props.is_admin && <Permission>Admin</Permission>}
              {props.is_staff && <Permission>Staff</Permission>}
              {props.is_landlord && <Permission>Land Lord</Permission>}
              {props.is_superuser && <Permission>Super user</Permission>}
              {props.is_active && <Permission>Active</Permission>}
              {!props.is_active && (
                <Permission deactivated>Deactivated</Permission>
              )}
            </div>
          </div>
        </div>
        {/* <FormButton
          red={props.is_active}
          green={!props.is_active}
          onClick={props.onDeactivate}
        >
          {props.is_active ? "Deactivate" : "Activate"}
        </FormButton> */}
      </div>
    </div>
  </div>
);

export default StaffMember;
