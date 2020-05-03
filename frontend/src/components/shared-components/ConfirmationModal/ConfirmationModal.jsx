import React from "react";
import Modal from "../Modal/Modal";
import { FormButton, DeleteButton } from "../Button/Button";
import classes from "./ConfirmationModal.module.css";

const ConfirmationModal = (props) => {
  return (
    <Modal open={props.open} onToggle={props.cancel} title="CONFIRM">
      <div className={classes.Message}>{props.children}</div>
      <div className={classes.ButtonGroup}>
        <FormButton onClick={props.continue}>Confirm</FormButton>
        <FormButton onClick={props.cancel} red={true}>
          Cancel
        </FormButton>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
