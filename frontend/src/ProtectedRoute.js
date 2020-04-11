import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const accessToken = localStorage.getItem("accessToken");

let currentTime = new Date().getTime() / 1000;
let decodedToken = null;
if (accessToken) {
  decodedToken = jwtDecode(accessToken.replace("Bearer ", ""));
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      accessToken !== null && decodedToken.exp > currentTime ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
