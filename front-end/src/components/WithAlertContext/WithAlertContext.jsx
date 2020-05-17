import React from "react";
import { AlertContext } from "context";

const WithAlertContext = (Component) => (props) => (
  <AlertContext.Consumer>
    {(context) => <Component alertContext={context} {...props} />}
  </AlertContext.Consumer>
);

export default WithAlertContext;
