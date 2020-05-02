import React from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
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
        <Navigation />
        <Switch>
          <Route path="/dashboard" component={DashboardRoutes} />
          <Route path="" component={ClientRoutes} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
