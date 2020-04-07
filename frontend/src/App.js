import React from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import HomePage from "./components/pages/home-page/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <HomePage />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
