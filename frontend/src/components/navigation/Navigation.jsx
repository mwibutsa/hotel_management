import React from "react";
import classes from "./Navigation.module.css";
import Logo from "../../images/Logo.svg";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import CustomNavLink from "../shared-components/NavLink/NavLink";
const Navigation = (props) => (
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
          <NavLink>
            <CustomNavLink link="/fake" label="Home" />
          </NavLink>
          <NavLink>
            <CustomNavLink link="/rooms" label="Rooms" />
          </NavLink>
          <NavLink>
            <CustomNavLink link="/booking" label="Booking" />
          </NavLink>
          <NavLink>
            <CustomNavLink link="/dashboard" label="Dashboard" />
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Navigation;
