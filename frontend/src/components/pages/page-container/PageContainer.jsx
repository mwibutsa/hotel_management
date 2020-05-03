import React from "react";

import SideNavigation from "../../side-navigation/SideNavigation";
import classes from "./PageContainer.module.css";

const PageContainer = (props) => {
  return (
    <div className={classes.PageContainer}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideNavigation />
          </div>
          <div className="col-md-9">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
