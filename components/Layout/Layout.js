import React from "react";

import classes from "./Layout.module.css";

const layout = props => {
  return (
    <React.Fragment>
      <main className={classes.MainContent}>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
