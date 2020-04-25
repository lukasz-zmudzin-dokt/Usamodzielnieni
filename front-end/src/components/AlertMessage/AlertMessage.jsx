import React, { useEffect, useCallback } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, open, handleClose }) => {
  const setClose = useCallback((val) => handleClose(!val), [handleClose]);

  return (
    <div className={`alertMsg ${open ? "alertMsg--visible" : ""}`}>
      <button className="alertMsg__close" onClick={setClose}>
        x
      </button>
      <Alert className="alertMsg__alert" variant="danger">
        {message}
      </Alert>
    </div>
  );
};

export default AlertMessage;
