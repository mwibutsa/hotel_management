import React from "react";
import classes from "./Card.module.css";
import CardRow from "../AttributeRow/AttributeRow";
import styles from "../../common.module.css";

const Card = (props) => {
  let value = { ...props.value };
  let content = "";

  if (value) {
    content = Object.entries(props.value).map(([key, value]) => {
      if (key !== "id") {
        let val = "";
        if (typeof value !== typeof true && !value) {
          val = "Not provided";
        } else {
          val = value;
        }
        return <CardRow label={key} value={val} key={key} />;
      }
    });
  } else {
    content = "No values provided";
  }

  return (
    <div className={classes.CardContainer}>
      <h4 className={styles.CardTitle}>{props.title || "--- No title ---"}</h4>
      <div className={classes.CardContent}>{content}</div>
      <div className={classes.ButtonContainer}>{props.children}</div>
    </div>
  );
};

export default Card;
