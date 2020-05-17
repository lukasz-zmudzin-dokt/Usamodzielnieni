import React, { useContext } from "react";
import { AlertContext } from "context";
import { AlertMessage } from "components";

const AlertsContainer = () => {
  const context = useContext(AlertContext);

  return (
    context.open && (
      <AlertMessage
        message={context.message}
        handleClose={context.changeVisibility}
        variant={context.variant}
      />
    )
  );
};

export default AlertsContainer;
