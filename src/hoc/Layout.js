import React, { Fragment } from "react";

import Header from "../components/Header";

const layout = props => (
  <Fragment>
    <Header isAuth={props.isAuth} />
    <main>{props.children}</main>
  </Fragment>
);

export default layout;
