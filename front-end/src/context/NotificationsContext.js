import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import { UserContext } from "context";

export const NotificationsContext = createContext(null);

export const NotificationsProvider = (props) => {
  const [notifications, setNotifications] = useState([]);
  const socket = useRef();

  const user = useContext(UserContext);

  useEffect(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    if (user.token) {
      const url =
        process.env.REACT_APP_BACKEND_PATH_WEBSOCKET +
        "/notification/count/unread";
      socket.current = new WebSocket(url, user.token);
      socket.current.onopen = (e) => console.log("onopen", e);
      socket.current.onmessage = (e) => {
        console.log("onmessage", JSON.parse(e.data));
        setNotifications([]); // TODO
      };
    }
  }, [user.token]);

  const data = {
    notifications,
    socket,
  };
  return <NotificationsContext.Provider value={data} {...props} />;
};
