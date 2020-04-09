import React from "react";
import classes from "./Room.module.css";

const Room = (props) => (
  <div
    className={classes.Room}
    onClick={() => props.onClick(props.room_number)}
  >
    <div className={classes.RoomHeading}>
      {props.room_number || " Room 101"}
    </div>
    <div className={classes.RoomContentContainer}>
      <div className={classes.RoomContent}>
        <div>STATUS: {props.room_status}</div>
        <div>CATEGORY: {props.room_category}</div>
        <div>PRICE: ${props.price}</div>
      </div>
    </div>
  </div>
);

export default Room;
