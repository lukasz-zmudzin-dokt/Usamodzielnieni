import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import routes from "constants/routes";
import PrivateRoute from "root/_components/PrivateRoute";
import { UserContext } from "context/UserContext";

const Router = () => {
  const location = useLocation();
  return (
    <UserContext.Consumer>
      {value => {
        return (
          <Switch location={location} key={location.pathname}>
            {routes.map(
              ({ component: Component, path, isPrivate, userVerified, ...rest }) => {
                if (isPrivate) {
                  return (
                    <PrivateRoute
                      path={path}
                      key={path}
                      userVerified={userVerified}
                      {...rest}
                      authenticated={value}
                    >
                      <Component {...rest} />
                    </PrivateRoute>
                  );
                }
                return (
                  <Route path={path} key={path} {...rest}>
                    <Component {...rest} />
                  </Route>
                );
              }
            )}
          </Switch>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Router;
