import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";
import ButtonSpinner from "../Spinner/ButtonSpinner";
export const LinkButton = (props) => (
  <Link
    to={props.path || ""}
    className={[classes.Button, classes.LinkButton, classes.YellowButton].join(
      " "
    )}
  >
    {props.label}
  </Link>
);

export const FormButton = (props) => {
  const buttonClasses = [classes.Button];

  const { red, green } = props;

  const color = red
    ? classes.RedButton
    : green
    ? classes.GreenButton
    : classes.YellowButton;
  buttonClasses.push(color);

  const loader = (
    <div>
      <ButtonSpinner />
    </div>
  );
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={buttonClasses.join(" ")}
    >
      <div>{props.children}</div> {props.loading ? loader : ""}
    </button>
  );
};

export const DeleteButton = (props) => (
  <div className={classes.DeleteButton} onClick={props.onClick}>
    {props.children}
  </div>
);
