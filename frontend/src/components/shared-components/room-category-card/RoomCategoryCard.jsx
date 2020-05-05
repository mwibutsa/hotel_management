import React from "react";
import classes from "./RoomCategoryCard.module.css";

const RoomCategoryCard = (props) => {
  const headerStyle =
    props.type !== "Gold" ? classes.HeaderSingle : classes.HeaderGold;
  return (
    <div className={classes.RoomCategoryCard}>
      <div className={[classes.Header, headerStyle].join(" ")}>
        {props.type}
      </div>
      <div className={classes.RoomDescription}>
        <div className={classes.Description}>{props.description}</div>
        <div className={classes.Price}>{props.price || "Negotiable"}</div>
      </div>

      <div className={classes.RoomImageContainer}>
        <img src={props.image} alt="" className={classes.RoomImage} />
      </div>
    </div>
  );
};

export default RoomCategoryCard;
