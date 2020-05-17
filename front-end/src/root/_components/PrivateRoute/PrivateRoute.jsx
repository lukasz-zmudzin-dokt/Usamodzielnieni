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
          for (let i = 0; i < type.length; i++) {
            if (type[i] === authenticated.type) {
              if (type[i] === userTypes.STAFF) {
                if (
                  authenticated.data.group_type.some(
                    (r) => group.indexOf(r) >= 0
                  ) ||
                  group === undefined
                ) {
                  return <Route {...rest} />;
                }
              } else {
                return <Route {...rest} />;
              }
            } else {
              if (i === type.length - 1) {
                return <Redirect to={unverified} />;
              }
            }
          }
        } else if (type === authenticated.type) {
          if (type === userTypes.STAFF) {
            console.log(
              authenticated.data.group_type,
              group,
              group === undefined
            );
            if (
              authenticated.data.group_type.some(
                (r) => group.indexOf(r) >= 0
              ) ||
              group === undefined
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
