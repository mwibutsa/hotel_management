import React from "react";
import classes from "./SideNavigation.module.css";
import { NavLink } from "react-router-dom";
const SideNavigation = (props) => (
  <div className={classes.SideNavigation}>
    <h3 className={classes.SideNavHeader}> Dashboard </h3>
    <div className={classes.SideNavMenu}>
      <div className={classes.NavLink}>
        <NavLink activeClassName={classes.ActiveNavLink} to="/dashboard/rooms">
          Rooms
        </NavLink>
      </div>

      <div className={classes.NavLink}>
        <NavLink
          activeClassName={classes.ActiveNavLink}
          to="/dashboard/bookings"
        >
          Booking
        </NavLink>
      </div>

      <div className={classes.NavLink}>
        <NavLink
          activeClassName={classes.ActiveNavLink}
          to="/dashboard/manage-staff"
        >
          Manage staff
        </NavLink>
      </div>
    </div>
  </div>
);

export default SideNavigation;
