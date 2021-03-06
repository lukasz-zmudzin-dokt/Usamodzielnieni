import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import { UserContext, ChatContext } from "context";
import proxy from "config/api";
import { paths } from "constants/paths";
import { compile } from "path-to-regexp";

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

const markNotificationAsRead = async (token, id) => {
  let url = proxy.notification + `mark-as-read/${id}/`;
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
  notifications: notifications.results.map((notification) => {
    if (notification.event === "Nowa wiadomość") {
      return null;
    }
    return mapNotification(notification);
  }),
  next: notifications.next?.replace(/.*page=/, "") || undefined,
});

const mapNotification = (notification) => {
  return {
    id: notification.slug,
    path: getPath(notification.app, notification.object_id),
    title: notification.text,
    time: new Date(notification.timestamp),
    unread: notification.unread,
  };
};

const getPath = (appName, id) => {
  if (appName) {
    return !id ? `/${appName}` : `/${appName}/${id}`;
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
  const [pathname, setPathname] = useState(null);
  const socket = useRef();

  const user = useContext(UserContext);
  const chatC = useRef(useContext(ChatContext));

  useEffect(() => {
    const loadNotifications = async (token) => {
      setError(false);
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
      setCount(loadedCount);
      setNext(loadedNext);
      setNotifications(loadedNotifications);
    };
    if (user.token) {
      loadNotifications(user.token);
    }
  }, [user.token]);

  useEffect(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    if (user.token) {
      const url = proxy.wsNotification + "ws";
      try {
        socket.current = new WebSocket(url, user.token);
        socket.current.onmessage = (e) => {
          const newNotification = mapNotification(JSON.parse(e.data));
          const parsedNotification = JSON.parse(e.data);
          setCount((prev) => prev + 1);
          setNotifications((prev) => [newNotification, ...prev]);
          if (parsedNotification.app === "chats") {
            chatC.current.loadMessages(user.token);
          }
        };
        socket.current.onerror = (e) => {
          console.log(e);
          setError(true);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [user.token]);

  useEffect(() => {
    const markNotificationsArray = async (notificationsToMark) => {
      let unreadCount = 0;
      notificationsToMark.forEach((not) => {
        unreadCount += not.unread ? 1 : 0;
      });
      if (unreadCount) {
        setCount((prev) => Math.max(prev - unreadCount, 0));
      }
      setNotifications(
        notifications.map((notification) => {
          const isNotificationToMark = notificationsToMark.find(
            (not) => notification.id === not.id
          );
          if (isNotificationToMark) {
            return {
              ...notification,
              unread: false,
            };
          }
          return notification;
        })
      );
      try {
        await Promise.all(
          notificationsToMark.map(async (not) => {
            await markNotificationAsRead(user.token, not.id);
          })
        );
      } catch (e) {
        setError(true);
        return;
      }
    };
    if (user.token && notifications && pathname) {
      const toMark = notifications.filter(
        (notification) =>
          notification.unread &&
          (notification.path === pathname ||
            (notification.path === paths.CHATS && pathname.match(/^\/chats\//)))
      );
      if (toMark.length > 0) {
        markNotificationsArray(toMark);
      }
    }
  }, [notifications, pathname, user.token]);

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
        res = await getNotifications(user.token, next);
      } catch (e) {
        setError(true);
        return;
      }
      setNext(res.next);
      setNotifications((prev) => [...prev, ...res.notifications]);
    },
    setNewPathname: (newPathname) => {
      if (pathname !== newPathname) {
        setPathname(newPathname);
      }
    },
  };
  return <NotificationsContext.Provider value={data} {...props} />;
};
