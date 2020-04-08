import React from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import HomePage from "./components/pages/home-page/HomePage";
import BookingPage from "./components/pages/booking-page/BookingPage";
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/booking" component={BookingPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
