import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import { UserContext } from "context";
import proxy from "config/api";
import { paths } from "constants/paths";
import { userTypes } from "constants/userTypes";
import { compile } from "path-to-regexp";

const getNotifications = async (token, type, next) => {
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
    .then((notifications) => mapNotifications(notifications, type));
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

const mapNotifications = (notifications, type) => ({
  notifications: notifications.results.map((notification) =>
    mapNotification(notification, type)
  ),
  next: notifications.next?.replace(/.*page=/, "") || undefined,
});

const mapNotification = (notification, type) => ({
  id: notification.slug,
  path: getPath(notification.app, notification.object_id, type),
  title: notification.text,
  time: new Date(notification.timestamp),
  unread: notification.unread,
});

const getPath = (appName, id, type) => {
  const isStandard = type === userTypes.STANDARD;
  if (appName.match(/^cv/)) {
    return isStandard
      ? compile(paths.MY_CVS)({})
      : compile(paths.CV_APPROVAL)({});
  } else if (appName.match(/^jobs/)) {
    return isStandard
      ? compile(paths.JOB_OFFERS)({})
      : compile(paths.MY_OFFERS)({});
  } else if (appName.match(/^account/)) {
    return compile(paths.USER)({});
  } else if (appName.match(/^blog/)) {
    return compile(paths.BLOG_POST)({ id });
  } else {
    return compile(paths.DASHBOARD)({});
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
    const loadNotifications = async (token, type) => {
      setError(false);
      let values;
      try {
        values = await Promise.all([
          getNotifications(token, type),
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
      setCount(loadedCount);
      setNext(loadedNext);
      setNotifications(loadedNotifications);
    };
    if (user.token && user.type) {
      loadNotifications(user.token, user.type);
    }
  }, [user.token, user.type]);

  useEffect(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    if (user.token && user.type) {
      const url = proxy.wsNotification + "ws";
      try {
        socket.current = new WebSocket(url, user.token);
        // socket.current.onopen = (e) => console.log("onopen", e);
        socket.current.onmessage = (e) => {
          const newNotification = mapNotification(
            JSON.parse(e.data),
            user.type
          );
          setCount((prev) => prev + 1);
          setNotifications((prev) => [newNotification, ...prev]);
        };
        socket.current.onerror = (e) => {
          console.log(e);
          setError(true);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [user.token, user.type]);

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
      const notificationToRemove = notifications.find(
        (notification) => notification.id === id
      );
      if (notificationToRemove?.unread && count > 0) {
        setCount((prev) => prev - 1);
      }
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
      setCount(0);
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
        res = await getNotifications(user.token, user.type, next);
      } catch (e) {
        setError(true);
        return;
      }
      setNext(res.next);
      setNotifications((prev) => [...prev, ...res.notifications]);
    },
  };
  return <NotificationsContext.Provider value={data} {...props} />;
};
