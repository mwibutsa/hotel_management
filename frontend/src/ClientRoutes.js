import React from "react";
import HomePage from "./components/pages/home-page/HomePage";
import BookingPage from "./components/pages/booking-page/BookingPage";
import LoginPage from "./components/pages/login-page/LoginPage";
import { Route, Switch } from "react-router-dom";

const ClientRoutes = (props) => (
  <React.Fragment>
    <Switch>
      <Route path="/booking" component={BookingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={HomePage} exact />
    </Switch>
  </React.Fragment>
);

export default ClientRoutes;
