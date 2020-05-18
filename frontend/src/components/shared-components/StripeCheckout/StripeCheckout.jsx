import React from "react";
import axios from "../../../axios";
import StripeCheckout from "react-stripe-checkout";

const STRIPE_PUBLISHABLE_KEY = "pk_test_tkRL5JxZASstI5Xtaydk76kJ00C4cm9fpr";
const BACKEND_PAYMENT_URL = "/booking/pay-advance/";

const CURRENCY = "USD";

const Checkout = (props) => {
  const onToken = (amount, description, customerEmail) => (token) =>
    axios
      .post(BACKEND_PAYMENT_URL, {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: amount * 100,
        customerEmail,
      })
      .then((data) => onSuccess(data))
      .catch((error) => onFailure(error));

  const {
    name,
    description,
    amount,
    customerEmail,
    onSuccess,
    onFailure,
  } = props;

  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={amount}
      token={onToken(amount, description, customerEmail)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE_KEY}
    />
  );
};

export default Checkout;
