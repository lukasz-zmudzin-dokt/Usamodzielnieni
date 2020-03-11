import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { paths } from "constants/routes";

const PrivateRoute = ({ redirect, ...rest }) => {
  return (
    <UserContext.Consumer>
      {value => {
        if (value.token) {
          return <Route {...rest} />;
        }
        return <Redirect to={redirect} />;
      }}
    </UserContext.Consumer>
  );
};

PrivateRoute.defaultProps = {
  redirect: paths.LOGIN
};

export default PrivateRoute;
