import React, { useState } from "react";
import Cookies from "universal-cookie";

export const UserContext = React.createContext({
  type: undefined, // Employer,Standard,Staff
  token: undefined,
  login: () => {},
  logout: () => {}
});
const cookies = new Cookies();

export const UserProvider = props => {
  const [type, setType] = useState(cookies.get("type"));
  const [token, setToken] = useState(cookies.get("token"));
  const user = {
    token,
    type,
    login: token => {
      cookies.set("token", token, { path: "/" });
      setToken(token);
    },
    logout: () => {
      cookies.remove("token", { path: "/" });
      cookies.remove("type", { path: "/" });
      setToken(undefined);
      setType(undefined);
    },
    setType: type => {
      cookies.set("type", type, { path: "/" });
      setType(type);
    }
  };
  return <UserContext.Provider value={user} {...props} />;
};
