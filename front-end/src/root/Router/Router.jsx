import React, { useRef, useContext } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import routes from "constants/routes";
import PrivateRoute from "root/_components/PrivateRoute";
import { UserContext, AlertContext } from "context";

const Router = () => {
  const location = useLocation();
  const history = useHistory();
  const alertC = useRef(useContext(AlertContext));
  const user = UserContext;

  const handleRedirect = () => {
    const msg = `Nie ma takiej strony. Nastąpiło przekierowanie do ${
      user.token ? "twojego profilu." : "strony głównej."
    }`;
    alertC.current.showAlert(msg);
    user.token ? history.push("/user") : history.push("/");
  };
  return (
    <UserContext.Consumer>
      {(value) => {
        return (
          <Switch location={location} key={location.pathname}>
            {routes.map(
              ({
                component: Component,
                path,
                isPrivate,
                userVerified,
                ...rest
              }) => {
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
            <Route>{handleRedirect}</Route>
          </Switch>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Router;
