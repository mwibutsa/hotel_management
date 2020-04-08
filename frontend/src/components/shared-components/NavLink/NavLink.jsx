import React from "react";
import { NavLink as Link } from "react-router-dom";

const NavLink = (props) => (
  <Link
    {...props}
    style={{ textDecoration: "none", color: "white", ...props.style }}
    to={props.link}
  >
    {props.label}
  </Link>
);

export default NavLink;
