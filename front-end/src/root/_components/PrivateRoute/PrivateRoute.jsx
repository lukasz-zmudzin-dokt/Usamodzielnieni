import React from "react";
import { Route, Redirect } from "react-router-dom";

import { paths } from "constants/paths";
import { userTypes } from "constants/userTypes";
import {userStatuses} from "constants/userStatuses";

const PrivateRoute = ({ redirect, unverified, type, authenticated, userVerified, group, ...rest }) => {
  const checkAuth = () => {
    if (authenticated.token) {
      if (!userVerified || authenticated.data.status === userStatuses.VERIFIED) {
        if (!type) return <Route {...rest} />;
        else if (type === authenticated.type) {
          if (type === userTypes.STAFF) {
            if (authenticated.data.group_type.includes(group) || group === undefined) {
              return <Route {...rest} />;
            }
          } else return <Route {...rest} />;
        }
      } else return <Redirect to={unverified} />
    }
    return <Redirect to={redirect} />;
  };

  return checkAuth();
};

PrivateRoute.defaultProps = {
  redirect: paths.DASHBOARD,
  unverified: paths.USER
};

export default PrivateRoute;
