import React from "react";
import classes from "./SelectInput.module.css";

const ListInput = (props) => (
  <select
    name="rootType"
    className={classes.SelectInput}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
  >
    <option value="0" disabled selected>
      Select room type
    </option>
    {props.options.map((option) => (
      <option value={option.value}>{option.label}</option>
    ))}
  </select>
);

export default ListInput;
