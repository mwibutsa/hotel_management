import React from "react";
import classes from "./Room.module.css";
import moment from "moment";
import { DeleteButton } from "../shared-components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Room = (props) => (
  <div className={classes.Room}>
    <div className={classes.RoomHeading}>
      <span>
        {props.rooms ? props.room_number : `${props.booking_days} days booking`}{" "}
      </span>
      <DeleteButton onClick={props.onDelete}>
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
      </DeleteButton>
    </div>
    <div
      className={classes.RoomContentContainer}
      onClick={() => props.onClick(props)}
    >
      {props.rooms && (
        <div className={[classes.RoomContent, classes.RoomText].join(" ")}>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>STATUS:</span>{" "}
            {props.room_status}
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>CATEGORY:</span>{" "}
            {props.room_category}
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>PRICE:</span> $
            {props.price}
          </div>
        </div>
      )}

      {props.bookings && (
        <div className={classes.RoomContent}>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>TOTAL PRICE:</span>
            <span className={classes.AttributeValue}>${props.total_price}</span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>REMAINING PRICE:</span>
            <span className={classes.AttributeValue}>
              ${props.remaining_price}
            </span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>BOOKING PERIOD:</span>
            <span className={classes.AttributeValue}>
              {props.booking_days} days
            </span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>CHECK IN DATE:</span>
            <span className={classes.AttributeValue}>
              {moment(
                props.actual_check_in_date || props.expected_check_in_date
              ).format("MMM Do YYYY")}
            </span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>CHECKOUT DATE:</span>
            <span className={classes.AttributeValue}>
              {moment(
                props.actual_checkout_date || props.expected_checkout_date
              ).format("MMM Do YYYY")}
            </span>
          </div>

          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>
              CUSTOMER BOOKING STATUS:
            </span>
            <span className={classes.AttributeValue}>
              {props.customer_booking_status}
            </span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>CREATED ON:</span>
            <span className={classes.AttributeValue}>
              {moment(props.created_at).format("MMM Do YYYY")}
            </span>
          </div>

          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>UPDATED ON:</span>
            <span className={classes.AttributeValue}>
              {moment(props.updated_at).format("MMM Do YYYY")}
            </span>
          </div>
          <div>
            <span
              className={classes.BookingStatus}
              style={{
                background:
                  props.booking_status.toLowerCase() === "pending"
                    ? "#707070"
                    : "#50E3C2",
              }}
            >
              {props.booking_status}
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Room;
