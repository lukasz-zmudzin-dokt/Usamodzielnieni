import React from "react";
import { AlertContext } from "context";

const withAlertContext = (Component) => (props) => (
  <AlertContext.Consumer>
    {(context) => <Component alertContext={context} {...props} />}
  </AlertContext.Consumer>
);

export default withAlertContext;
