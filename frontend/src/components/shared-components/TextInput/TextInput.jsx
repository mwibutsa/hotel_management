import React, { useState } from "react";
import classes from "./TextInput.module.css";

const Input = (props) => {
  const [type, setType] = useState("text");
  const properties = {
    required: props.required === false ? false : true,
  };
  return (
    <input
      type={props.type !== "date" ? props.type : type}
      onChange={props.onChange}
      onBlur={() =>
        props.type === "password" || props.type === "checkbox"
          ? setType(props.type)
          : setType("text")
      }
      onFocus={() =>
        props.type === "date" ? setType("date") : setType(props.type)
      }
      name={props.name}
      value={props.value}
      className={[classes.TextInput, props.className].join(" ")}
      placeholder={props.placeholder}
      {...properties}
      checked={props.value}
    />
  );
};

export default Input;
