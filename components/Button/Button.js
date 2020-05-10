import React from "react";

import classes from "./Button.module.css";

const button = props => {
  let buttonClasses = [
    classes.Button,
    classes.Primary,
    classes.Large,
    classes.Wide
  ];
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.clicked}
      className={buttonClasses.join(" ")}
    >
      {props.children}
    </button>
  );
};

export default button;
