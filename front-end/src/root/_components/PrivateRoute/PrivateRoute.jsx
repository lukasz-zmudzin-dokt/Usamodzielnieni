import React from "react";
import { Route, Redirect } from "react-router-dom";

import { paths } from "constants/paths";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";

// linijka 32: (ciekawe zastosowanie)
// https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript/29447130

const PrivateRoute = ({
  redirect,
  unverified,
  type,
  authenticated,
  userVerified,
  group,
  ...rest
}) => {
  const checkAuth = () => {
    if (authenticated.token) {
      if (
        !userVerified ||
        authenticated.data.status === userStatuses.VERIFIED
      ) {
        if (!type) return <Route {...rest} />;
        else if (Array.isArray(type)) {
          let index = type.indexOf(authenticated.type);
          if (type[index] === authenticated.type) {
            if (type[index] === userTypes.STAFF) {
              if (
                group === undefined ||
                authenticated.data.group_type.some(
                  (type) => group.indexOf(type) >= 0
                )
              ) {
                return <Route {...rest} />;
              }
            } else {
              return <Route {...rest} />;
            }
          } else {
            return <Redirect to={unverified} />;
          }
        } else if (type === authenticated.type) {
          if (type === userTypes.STAFF) {
            if (
              group === undefined ||
              authenticated.data.group_type.some(
                (type) => group.indexOf(type) >= 0
              )
            ) {
              return <Route {...rest} />;
            }
          } else return <Route {...rest} />;
        }
      } else return <Redirect to={unverified} />;
    }
    return <Redirect to={redirect} />;
  };

  return checkAuth();
};

PrivateRoute.defaultProps = {
  redirect: paths.DASHBOARD,
  unverified: paths.USER,
};

export default PrivateRoute;
