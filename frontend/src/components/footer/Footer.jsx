import React from "react";
import classes from "./Footer.module.css";
import Logo from "../../images/Logo.svg";

const Footer = (props) =>
  !window.location.href.includes("dashboard") && (
    <div className={classes.Footer}>
      <div className="container">
        <div className="row">
          <div className="col col-sm-12 col-md-3">
            <h4>Contact</h4>
            <p>Email: ask-info@sweetlife.com</p>
            <p>Tel: +250787740316</p>
          </div>
          <div className="col col-sm-12 col-md-3">
            <h4>Services</h4>
            <p>VIP Rooms</p>
            <p>Swimming pool</p>
            <p>Gym</p>
            <p>Bar & Restaurant</p>
          </div>
          <div className="col col-sm-12 col-md-3">
            <h4>About</h4>
            <p>
              Sweet life hope was first opened on 12th , August 2020, in
              Kigali,Rwanda. KN7 ave
            </p>
          </div>
          <div className="col col-sm-12 col-md-2 offset-1">
            <img className={classes.FooterLogo} src={Logo} alt="" />
          </div>
        </div>
      </div>
      <div className={classes.BottomFooter}>
        <p className={classes.TextCenter}>Copy right 2020 SweetLife Hotel</p>
      </div>
    </div>
  );

export default Footer;
