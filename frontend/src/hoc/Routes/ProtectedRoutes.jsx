import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { autoLogin } from "../../redux/actions/login-action";
import RoomsPage from "../../components/pages/rooms-page/Rooms";
import { Route, Switch, Redirect } from "react-router";

const ProtectedRoute = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!props.accessToken);
  const { accessToken } = props;

  useEffect(() => {
    console.log("Hi");
    autoLogin();
    setIsLoggedIn(!!accessToken);
  }, [isLoggedIn, accessToken]);

  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <React.Fragment>
      <Switch>
        <Route to="/dashboard/rooms/" render={() => <RoomsPage {...props} />} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.login.accessToken,
  refreshToken: state.login.refreshToken,
  loginErrors: state.login.errors,
  loading: state.login.loading,
});
export default connect(mapStateToProps, {})(ProtectedRoute);
