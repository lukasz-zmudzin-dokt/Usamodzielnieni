import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import routes from "constants/routes";
import PrivateRoute from "root/_components/PrivateRoute";

const Router = () => {
  const location = useLocation();
  return (
    <Switch location={location} key={location.pathname}>
      {routes.map(({ component: Component, path, isPrivate, ...rest }) => {
        if (isPrivate) {
          return (
            <PrivateRoute path={path} key={path} {...rest}>
              <Component {...rest} />
            </PrivateRoute>
          );
        }
        return (
          <Route path={path} key={path} {...rest}>
            <Component {...rest} />
          </Route>
        );
      })}
    </Switch>
  );
};

export default Router;
