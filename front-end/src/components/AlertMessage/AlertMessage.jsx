import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, handleClose,variant }) => {
  return (
    <div className="alertMsg--scale">
      <div className="alertMsg">
        <Alert className="alertMsg__alert" variant={variant} onClick={() => handleClose(false)} dismissible>
          {message}
        </Alert>
      </div>
    </div>
  );
};

export default AlertMessage;
