import React, { useContext } from "react";
import { AlertContext } from "context";
import { AlertMessage } from "components";
const AlertsContainer = () => {
  const context = useContext(AlertContext);
  console.log(context);
  return (
    <AlertMessage
      open={context.open}
      message={context.message}
      handleClose={context.changeVisibility}
    />
  );
};

export default AlertsContainer;
