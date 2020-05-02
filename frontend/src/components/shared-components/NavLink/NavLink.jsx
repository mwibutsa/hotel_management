import React from "react";
import { NavLink as Link } from "react-router-dom";

const NavLink = (props) => (
  <Link
    {...props}
    style={{
      textDecoration: "none",
      color: "white",
      margin: "0px 10px",
      ...props.style,
    }}
    to={props.link}
  >
    {props.label}
  </Link>
);

export default NavLink;
