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
  !props.red
    ? buttonClasses.push(classes.YellowButton)
    : buttonClasses.push(classes.RedButton);

  const loader = (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "10%",
        transform: "translate(-50%, -70%)",
      }}
    >
      <ButtonSpinner />
    </div>
  );
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={buttonClasses.join(" ")}
    >
      {props.children} {props.loading ? loader : ""}
    </button>
  );
};

export const DeleteButton = (props) => (
  <div className={classes.DeleteButton} onClick={props.onClick}>
    {props.children}
  </div>
);
