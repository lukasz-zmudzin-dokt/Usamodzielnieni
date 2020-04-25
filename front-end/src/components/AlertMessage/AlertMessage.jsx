import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, open, handleClose }) => {
  setTimeout(() => handleClose(false), 3000);
  return (
    <div className={`alertMsg ${open ? "alertMsg--visible" : ""}`}>
      <button className="alertMsg__close" onClick={() => handleClose(false)}>
        x
      </button>
      <Alert className="alertMsg__alert" variant="danger">
        {message}
      </Alert>
    </div>
  );
};

export default AlertMessage;
