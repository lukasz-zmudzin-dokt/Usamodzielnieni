import React from "react";
import { Route, Redirect } from "react-router-dom";

import { paths } from "constants/paths";
import { userTypes } from "constants/userTypes";

const PrivateRoute = ({ redirect, type, authenticated, group, ...rest }) => {
  const checkAuth = () => {
    if (authenticated.token) {
      if (!type) return <Route {...rest} />;
      else if (type === authenticated.type) {
        if (type === userTypes.STAFF) {
          if (authenticated.data.group_type === group || group === undefined) {
            return <Route {...rest} />;
          }
        } else return <Route {...rest} />;
      }
    }
    return <Redirect to={redirect} />;
  };

  return checkAuth();
};

PrivateRoute.defaultProps = {
  redirect: paths.DASHBOARD,
};

export default PrivateRoute;
