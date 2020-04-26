import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, handleClose }) => {
  return (
    <div className={`alertMsg--scale `}>
      <div className={`alertMsg `}>
        <button className="alertMsg__close" onClick={() => handleClose(false)}>
          x
        </button>
        <Alert className="alertMsg__alert" variant="danger">
          {message}
        </Alert>
      </div>
    </div>
  );
};

export default AlertMessage;
