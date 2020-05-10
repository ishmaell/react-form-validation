import React from "react";
import "./Spinner.scss";

export const spinner = () => (
  <div className="Circle">
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" />
      <path d="M50,0c13.26,0,25.98,5.27,35.36,14.64S100,36.74,100,50" />
    </svg>
  </div>
);
