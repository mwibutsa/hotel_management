import React from "react";
import classes from "./RoomCategoryCard.module.css";
import RoomImage from "../../../images/febrian-zakaria-sjvU0THccQA-unsplash.png";

const RoomCategoryCard = (props) => {
  const headerStyle =
    props.type === "single" ? classes.HeaderSingle : classes.HeaderGold;
  return (
    <div className={classes.RoomCategoryCard}>
      <div className={[classes.Header, headerStyle].join(" ")}>Single</div>
      <div className={classes.RoomDescription}>
        <div className={classes.Description}>A room for one Person</div>
        <div className={classes.Price}>$200</div>
      </div>

      <div className={classes.RoomImageContainer}>
        <img
          src={props.image || RoomImage}
          alt=""
          className={classes.RoomImage}
        />
      </div>
    </div>
  );
};

export default RoomCategoryCard;
