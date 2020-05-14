import React from "react";
import classes from "./AttributeRow.module.css";
import moment from "moment";

const AttributeRow = (props) => {
  let value = props.value;

  if (props.label.includes("_at")) {
    value = moment(props.value).format("MMM Do YYYY");
  }
  if (typeof props.value === typeof true) {
    value = props.value ? "Yes" : "No";
  }
  return (
    <div className={classes.AttributeRow}>
      <span className={classes.AttributeLabel}>
        {props.label.split("_").join(" ")}
      </span>
      <span className={classes.AttributeValue}>{value}</span>
    </div>
  );
};

export default AttributeRow;
