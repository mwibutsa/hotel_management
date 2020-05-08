import React from "react";
import classes from "./Navigation.module.css";
import Logo from "../../images/Logo.svg";
import { Navbar, Nav } from "react-bootstrap";
import CustomNavLink from "../shared-components/NavLink/NavLink";
const Navigation = (props) => (
  <React.Fragment>
    <div className={classes.NavigationContainer}>
      <div className={classes.FixedNavigation}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixe="top">
          <Navbar.Brand href="/">
            <img src={Logo} alt="" className={classes.Logo} />
            <h3 className={classes.LogoLabel}>SWEET LIFE HOTEL</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <CustomNavLink link="/" label="Home" />
              <CustomNavLink link="/dashboard/rooms" label="Rooms" />
              <CustomNavLink link="/booking" label="Booking" />
              <CustomNavLink link="/dashboard/rooms" label="Dashboard" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
    <div className={classes.ClearNavigation}></div>
  </React.Fragment>
);

export default Navigation;
