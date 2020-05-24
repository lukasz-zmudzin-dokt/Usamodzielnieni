import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import { UserContext } from "context";
import proxy from "config/api";

const getNotifications = async (token, next) => {
  let url = proxy.notification + "list/all" + (next ? `?page=${next}` : "");
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return response
    .json()
    .then((notifications) => mapNotifications(notifications));
};

const getNotificationsCount = async (token) => {
  let url = proxy.notification + "count/unread";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return (await response.json()).unread_count;
};

const markAsRead = async (token) => {
  let url = proxy.notification + "list/all/mark-as-read/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "POST", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return;
};

const deleteNotification = async (token, id) => {
  let url = proxy.notification + `delete/${id}/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "DELETE", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return;
};

const deleteNotifications = async (token) => {
  let url = proxy.notification + "list/all/delete/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "DELETE", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return;
};

const mapNotifications = (notifications) => ({
  notifications: notifications.results.map((notification) =>
    mapNotification(notification)
  ),
  next: notifications.next?.replace(/.*page=/, "") || undefined,
});

const mapNotification = (notification) => ({
  id: notification.slug,
  path: getPath(notification.app, notification.object_id),
  title: notification.text,
  time: new Date(notification.timestamp),
  unread: notification.unread,
});

const getPath = (type, id) => {
  switch (type) {
    case "cv/generator/":
      return "/cvEditor";
    case "jobs":
      return "/";
    default:
      return "/";
  }
};

export const NotificationsContext = createContext(null);

export const NotificationsProvider = (props) => {
  const [notifications, setNotifications] = useState(null);
  const [count, setCount] = useState(null);
  const [next, setNext] = useState();
  const [error, setError] = useState(false);
  const socket = useRef();

  const user = useContext(UserContext);

  useEffect(() => {
    const loadNotifications = async (token) => {
      let values;
      try {
        values = await Promise.all([
          getNotifications(token),
          getNotificationsCount(token),
        ]);
      } catch (e) {
        console.log(e);
        setError(true);
        return;
      }
      const [
        { notifications: loadedNotifications, next: loadedNext },
        loadedCount,
      ] = values;
      setNotifications(loadedNotifications);
      setNext(loadedNext);
      setCount(loadedCount);
    };
    loadNotifications(user.token);
  }, [user.token]);

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
        const newNotification = mapNotification(JSON.parse(e.data));
        console.log("onmessage", newNotification);
        setNotifications((prev) => [newNotification, ...prev]);
        setCount((prev) => prev + 1);
      };
      socket.current.onerror = (e) => {
        console.log(e);
        setError(true);
      };
    }
  }, [user.token]);

  const data = {
    notifications,
    count,
    error,
    next,
    socket,
    markAsRead: async () => {
      setCount(0);
      try {
        await markAsRead(user.token);
      } catch (e) {
        setError(true);
        return;
      }
    },
    deleteNotification: async (id) => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
      try {
        await deleteNotification(user.token, id);
      } catch (e) {
        setError(true);
        return;
      }
    },
    deleteNotifications: async () => {
      setNotifications([]);
      try {
        await deleteNotifications(user.token);
      } catch (e) {
        setError(true);
        return;
      }
    },
    loadMoreNotifications: async () => {
      setNext(null);
      let res;
      try {
        res = await getNotifications(user.token, next);
      } catch (e) {
        setError(true);
        return;
      }
      setNotifications((prev) => [...prev, ...res.notifications]);
      setNext(res.next);
    },
  };
  return <NotificationsContext.Provider value={data} {...props} />;
};
