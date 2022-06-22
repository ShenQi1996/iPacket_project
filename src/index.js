import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode> remember this is a new version of react.  it remders app the 2nd time.
  <App />
  // </React.StrictMode>
);
