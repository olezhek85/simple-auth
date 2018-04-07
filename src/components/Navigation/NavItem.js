import React from "react";
import { NavLink } from "react-router-dom";

export default ({ link, exact, children }) => (
  <NavLink to={link} exact={exact} className="nav-item nav-link">
    {children}
  </NavLink>
);
