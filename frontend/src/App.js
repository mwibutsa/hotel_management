import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import DashboardRoutes from "./DashboardRoutes";
import ClientRoutes from "./ClientRoutes";

import { Provider } from "react-redux";

import dotenv from "dotenv";

dotenv.config();
const App = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/dashboard" component={DashboardRoutes} />
          <Route path="" component={ClientRoutes} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
