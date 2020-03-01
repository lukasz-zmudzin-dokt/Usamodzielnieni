import React, { useState } from "react";
import Cookies from "universal-cookie";

export const UserContext = React.createContext({
  type: undefined, // employer,staff,charge
  token: undefined,
  login: () => {},
  logout: () => {}
});
const cookies = new Cookies();

export const UserProvider = props => {
  const type = "charge";
  const [token, setToken] = useState(cookies.get("token"));
  const user = {
    token,
    login: token => {
      cookies.set("token", token, { path: "/" });
      setToken(token);
    },
    logout: () => {
      cookies.remove("token", { path: "/" });
      setToken(undefined);
    },
    type
  };
  return <UserContext.Provider value={user} {...props} />;
};
