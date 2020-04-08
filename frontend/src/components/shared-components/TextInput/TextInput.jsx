import React, { useState } from "react";
import classes from "./TextInput.module.css";
const Input = (props) => {
  const [type, setType] = useState("text");

  return (
    <input
      type={type}
      onChange={props.onChange}
      onBlur={() => setType("text")}
      onFocus={() =>
        props.type === "date" ? setType("date") : setType(props.type)
      }
      name={props.name}
      value={props.value}
      className={classes.TextInput}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
