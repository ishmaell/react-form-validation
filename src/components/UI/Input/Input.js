import React from "react";
import classes from "./Input.module.css";

import utils from "../../../utils";

export const input = props => {
  let inputElem = null;
  let inputClasses = null;
  let errorMessage = null;

  if (props.touched && props.validation) {
    if (!props.validation.valid) {
      inputClasses = classes.InputError;
      errorMessage = <p>This is a required field</p>;
      if (!props.empty && props.validation.isEmail) {
        if (!props.validation.isEmail.valid) {
          errorMessage = <p>Invalid email format</p>;
        }
      }
    }
  }

  switch (props.type) {
    case "input":
      inputElem = (
        <input
          value={props.value}
          onChange={props.changed}
          className={inputClasses}
          {...props.preset}
        />
      );
      break;
    case "select":
      inputElem = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
          <option value="">-- Select --</option>
          {props.preset.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            );
          })}
        </select>
      );
      break;
    case "radio":
      inputElem = (
        <div className={classes.RadioContainer}>
          {props.preset.options.map(option => {
            return (
              <div key={option.value} className={classes.Radio}>
                <input
                  checked={props.value === option.value}
                  onChange={props.changed}
                  id={option.value}
                  type={props.type}
                  value={option.value}
                  name={utils.formatStr(props.preset.label)}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            );
          })}
        </div>
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          value={props.value}
          onChange={props.changed}
          className={inputClasses}
          {...props.preset}
        />
      );
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      <label>{props.preset.label}</label>
      {inputElem}
      {errorMessage}
    </React.Fragment>
  );
};

export const formGroup = props => {
  return <div className={classes.FormGroup}>{props.children}</div>;
};
