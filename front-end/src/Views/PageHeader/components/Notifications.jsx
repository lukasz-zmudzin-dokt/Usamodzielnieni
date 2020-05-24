import React, { useState, useContext, useEffect } from "react";
import { Nav, Dropdown, Col } from "react-bootstrap";
import NotificationItemContainer from "./NotificationItemContainer";
import NotificationItem from "./NotificationItem";
import NotificationToggle from "./NotificationToggle";
import { NotificationsContext } from "context";

const Notifications = ({ location, token, ...rest }) => {
  const [show, setShow] = useState(false);
  const notificationsContext = useContext(NotificationsContext);
  const { notifications, count, error } = notificationsContext;

  useEffect(() => {
    if (notifications && count) {
      const toRemove = notifications.filter(
        (notification) => notification.path === location.pathname
      );
      toRemove.forEach((notification) => {
        notificationsContext.deleteNotification(notification.id);
      });
    }
  }, [notificationsContext, count, notifications, location.pathname]);

  const clearNotifications = async () => {
    setShow("prevent");
    await notificationsContext.deleteNotifications();
  };

  const removeNotification = async (id) => {
    await notificationsContext.deleteNotification(id);
  };

  const onToggle = async (isOpen) => {
    setShow((prev) => (prev !== "prevent" ? !prev : true));
    if (isOpen && count) {
      await notificationsContext.markAsRead();
    }
  };

  const loadMoreNotifications = async () => {
    setShow("prevent");
    await notificationsContext.loadMoreNotifications();
  };

  return (
    <Dropdown
      as={Nav.Item}
      alignRight
      show={show}
      onToggle={onToggle}
      {...rest}
    >
      <Dropdown.Toggle
        as={NotificationToggle}
        count={notifications === null || error ? 0 : count}
      />
      <Dropdown.Menu data-testid="dropdownMenu">
        {notifications === null ? (
          <Dropdown.Item disabled="true">Ładowanie...</Dropdown.Item>
        ) : (
          <>
            {!notifications.length ? (
              <Dropdown.Item as={Col} disabled>
                Brak powiadomień
              </Dropdown.Item>
            ) : (
              <div className="notifications-container">
                {notifications.map((notification) => (
                  <NotificationItemContainer
                    key={notification.id}
                    data-testid={`dropdownItem${notification.id}`}
                    onClick={removeNotification}
                    notification={notification}
                  >
                    <Dropdown.Item
                      as={NotificationItem}
                      notification={notification}
                    />
                  </NotificationItemContainer>
                ))}
                {notificationsContext.next !== undefined && (
                  <Dropdown.Item
                    key="loadButton"
                    onClick={loadMoreNotifications}
                    disabled={notificationsContext.next === null}
                  >
                    Załaduj kolejne
                  </Dropdown.Item>
                )}
              </div>
            )}
            <Dropdown.Divider />
            <Dropdown.Item
              key="clearButton"
              onClick={clearNotifications}
              disabled={!notifications.length}
            >
              Wyczyść
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notifications;
