import React from "react";
import Modal from "../Modal/Modal";
import { FormButton } from "../Button/Button";
import classes from "./ConfirmationModal.module.css";

const ConfirmationModal = (props) => {
  return (
    <Modal open={props.open} onToggle={props.cancel} title="CONFIRM">
      <div className={classes.Message}>{props.children}</div>
      <div className={classes.ButtonGroup}>
        <FormButton onClick={props.continue} red>
          {props.label || "DELETE"}
        </FormButton>
        <FormButton onClick={props.cancel}>Cancel</FormButton>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
