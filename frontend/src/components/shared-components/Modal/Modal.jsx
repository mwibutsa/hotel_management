import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "ModalContainer") {
      props.onToggle();
    }
  };

  if (!props.open) {
    return null;
  }

  return (
    <div
      className={classes.ModalContainer}
      id="ModalContainer"
      onClick={handleOutsideClick}
    >
      <div className={classes.Modal}>
        <div className={classes.CloseButtonContainer} onClick={props.onToggle}>
          {props.title && (
            <span className={classes.ModalTitle}>{props.title}</span>
          )}
          <span className={classes.CloseButton}>X</span>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
