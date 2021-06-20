import React from "react";
import { Spinner } from "react-bootstrap";
export default function Loader() {
  return (
    <Spinner
      animation="grow"
      variant="primary"
      role="status"
      style={{
        width: "10px",
        height: "10px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
}
