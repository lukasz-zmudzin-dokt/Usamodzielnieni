import React from "react";
import { Route, Redirect } from "react-router-dom";

import { paths } from "constants/routes";

const PrivateRoute = ({ redirect, type, authenticated, ...rest }) => {
  const checkAuth = () => {
    if (authenticated.token) {
      if (!type) return <Route {...rest} />;
      else if (type === authenticated.type) return <Route {...rest} />;
    }
    return <Redirect to={redirect} />;
  };

  return checkAuth();
};

PrivateRoute.defaultProps = {
  redirect: paths.HOME
};

export default PrivateRoute;
