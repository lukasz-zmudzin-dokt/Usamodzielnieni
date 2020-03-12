import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { paths } from "constants/routes";

const PrivateRoute = ({ redirect, type, ...rest }) => {
  return (
    <UserContext.Consumer>
      {value => {
        if (value.token) {
          if (!type) return <Route {...rest} />;
          else if (type === value.type) return <Route {...rest} />;
        }
        return <Redirect to={redirect} />;
      }}
    </UserContext.Consumer>
  );
};

PrivateRoute.defaultProps = {
  redirect: paths.HOME
};

export default PrivateRoute;
