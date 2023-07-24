import React from "react";
import Spiner from "react-bootstrap/Spinner";

const Spinner = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-align-items-center"
        style={{ width: "100%", height: "50vh" }}
      >
        <Spiner animation="border" variant="danger" />
        &nbsp; Loading...
      </div>
    </>
  );
};

export default Spinner;
