import React from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import HomePage from "./components/pages/home-page/HomePage";
import BookingPage from "./components/pages/booking-page/BookingPage";
import LoginPage from "./components/pages/login-page/LoginPage";
import store from "./redux/store";
import RoomsPage from "./components/pages/rooms-page/Rooms";
import ProtectedRoute from "./ProtectedRoute";
import { Provider } from "react-redux";
import ListBookingPage from "./components/pages/list-booking-page/BookingList";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navigation />
        <Switch>
          <Route path="/booking" component={BookingPage} />
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/dashboard/rooms" component={RoomsPage} />
          <ProtectedRoute
            path="/dashboard/bookings"
            component={ListBookingPage}
          />
          <Route path="/" component={HomePage} exact />
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
