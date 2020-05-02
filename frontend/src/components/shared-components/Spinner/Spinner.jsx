import React from "react";
import classes from "../../common.module.css";

const Spinner = (props) => (
  <div className={classes.SpinnerContainer}>
    <div className={classes.Spinner}>
      <div></div>
      <div></div>
    </div>
  </div>
);

export const BarSpinner = (props) => (
  <div className={classes.BarSpinner}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
