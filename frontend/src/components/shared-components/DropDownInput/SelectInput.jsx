import React from "react";
import classes from "./SelectInput.module.css";

const ListInput = (props) => {
  return (
    <select
      name={props.name}
      className={classes.SelectInput}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    >
      {props.options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ListInput;
