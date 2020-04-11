import React from "react";
import classes from "./Room.module.css";

const Room = (props) => (
  <div
    className={classes.Room}
    onClick={() =>
      props.onClick(props.bookings ? props.customer_name : props.room_number)
    }
  >
    <div className={classes.RoomHeading}>
      {props.rooms ? props.room_number : `${props.customer_name}`}
    </div>
    <div className={classes.RoomContentContainer}>
      {props.rooms && (
        <div className={classes.RoomContent}>
          <div>STATUS: {props.room_status}</div>
          <div>CATEGORY: {props.room_category}</div>
          <div>PRICE: ${props.price}</div>
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
              {props.actual_check_in_date || props.expected_check_in_date}
            </span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>CHECKOUT DATE:</span>
            <span className={classes.AttributeValue}>
              {props.actual_checkout_date || props.expected_checkout_date}
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
            <span className={classes.AttributeContainer}>CREATED AT:</span>
            <span className={classes.AttributeValue}>{props.created_at}</span>
          </div>

          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>CREATED AT:</span>
            <span className={classes.AttributeValue}>{props.updated_at}</span>
          </div>
          <div className={classes.AttributeRow}>
            <span className={classes.AttributeContainer}>EMAIL:</span>
            <span className={classes.AttributeValue}>
              {props.customer_email}
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
