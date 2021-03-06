import React, { useState } from "react";
import Cookies from "universal-cookie";

export const UserContext = React.createContext({
  type: undefined,
  token: undefined,
  data: undefined,
  changeToken: () => {},
  changeType: () => {},
  changeData: () => {},
  login: () => {},
  logout: () => {},
});
const cookies = new Cookies();

export const UserProvider = (props) => {
  const [type, setType] = useState(cookies.get("type"));
  const [token, setToken] = useState(cookies.get("token"));
  const [data, setData] = useState(cookies.get("data"));

  const user = {
    token,
    type,
    data,
    changeToken: (newToken) => {
      cookies.set("token", newToken, {
        path: "/",
        expires: setCookieDate(),
        secure: process.env.REACT_APP_SECURE_COOKIES === "on",
      });
      setToken(newToken);
    },
    changeType: (newType) => {
      cookies.set("type", newType, {
        path: "/",
        expires: setCookieDate(),
        secure: process.env.REACT_APP_SECURE_COOKIES === "on",
      });
      setType(newType);
    },
    changeData: (newData) => {
      cookies.set("data", newData, {
        path: "/",
        expires: setCookieDate(),
        secure: process.env.REACT_APP_SECURE_COOKIES === "on",
      });
      setData(newData);
    },
    login: (newToken, newType, newData) => {
      user.changeToken(newToken);
      user.changeType(newType);
      user.changeData(newData);
    },
    logout: () => {
      cookies.remove("token", { path: "/" });
      cookies.remove("type", { path: "/" });
      cookies.remove("data", { path: "/" });
      setToken(undefined);
      setType(undefined);
      setData(undefined);
    },
  };

  return <UserContext.Provider value={user} {...props} />;
};

const setCookieDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};
