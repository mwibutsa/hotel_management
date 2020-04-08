import React from "react";
import classes from "./BookingPage.module.css";
import TextInput from "../../shared-components/TextInput/TextInput";
import SelectInput from "../../shared-components/DropDownInput/SelectInput";
import { FormButton } from "../../shared-components/Button/Button";
import commonClasses from "../../common.module.css";

const BookingPage = (props) => {
  return (
    <div className={["container", classes.BookingPage].join(" ")}>
      <h3 className={classes.h3}>BOOK YOUR FAVORITE ROOM</h3>

      <div className="row">
        <div className="col col-md-6 offset-3">
          <form className={classes.Form}>
            <TextInput placeholder="Full name" name="customerName" />
            <TextInput placeholder="E-mail" name="customerEmail" />
            <TextInput
              placeholder="Expected check in date"
              type="date"
              name="checkInDate"
            />
            <TextInput
              placeholder="Expected checkout date"
              type="date"
              name="CheckoutDate"
            />
            <SelectInput
              placeholder="Room type"
              options={[{ value: 1, label: "Single" }]}
            />

            <p className={commonClasses.TextCenter}>
              <FormButton> Submit Booking </FormButton>
            </p>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
};

export default BookingPage;
