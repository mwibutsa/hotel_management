import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

export const LinkButton = (props) => (
  <Link
    to={props.path}
    className={[classes.Button, classes.LinkButton].join(" ")}
  >
    {props.label}
  </Link>
);

export const FormButton = (props) => (
  <button type="submit" onClick={props.onClick} className={classes.Button}>
    {props.children}
  </button>
);
