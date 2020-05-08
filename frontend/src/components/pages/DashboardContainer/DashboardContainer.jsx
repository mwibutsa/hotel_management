import React from "react";
import Navigation from '../../navigation/Navigation'
import SideNavigation from "../../side-navigation/SideNavigation";
import classes from "./DashboardContainer.module.css";

const DashboardContainer = (props) => {
  return (
    <div className={classes.DashboardContainer}>
      <div className="container-fluid">
        <div className="row">
          <Navigation />
        </div>

        <div className={classes.MainPage}>

          <div className={classes.SideNavContainer}>
            <SideNavigation />
          </div>
          <div className={classes.ContentContainer}>
            <br />
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
