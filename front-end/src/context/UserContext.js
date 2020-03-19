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
    login: (newToken, newType) => {
      cookies.set("token", newToken, { path: "/" });
      cookies.set("type", newType, { path: "/" });
      setToken(newToken);
      setType(newType);
    },
    logout: () => {
      cookies.remove("token", { path: "/" });
      cookies.remove("type", { path: "/" });
      setToken(undefined);
      setType(undefined);
    }
  };
  return <UserContext.Provider value={user} {...props} />;
};
