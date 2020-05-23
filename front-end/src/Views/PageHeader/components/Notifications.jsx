import React, { useContext } from "react";
import { Nav, Dropdown, Col } from "react-bootstrap";
import NotificationItemContainer from "./NotificationItemContainer";
import NotificationItem from "./NotificationItem";
import NotificationToggle from "./NotificationToggle";
import { NotificationsContext } from "context";

// const mapNotifications = (notifications) =>
//   notifications.map((not) => ({
//     id: not.id,
//     path: getPath(not.type),
//     title: not.title,
//     time: new Date(not.time),
//     // TODO
//   }));

// const getPath = (type) => {
//   switch (type) {
//     case "cv":
//       return "/cvEditor";
//     case "jobs":
//       return "/";
//     default:
//       return "/";
//   }
// };

const Notifications = ({ location, token, ...rest }) => {
  const notifications = useContext(NotificationsContext);

  // const toRemove = notifications.filter(
  //   (not) => not.path === location.pathname
  // );
  // if (toRemove.length) {
  //   deleteNotifications(toRemove, token);
  // }

  const clearNotifications = (e) => {
    // deleteNotifications(notifications, token);
  };

  const removeNotification = (id) => {
    // deleteNotifications(
    //   notifications.filter((not) => not.id === id),
    //   token
    // );
  };

  return (
    <Dropdown as={Nav.Item} {...rest}>
      <Dropdown.Toggle as={NotificationToggle} count={notifications.length} />
      <Dropdown.Menu data-testid="dropdownMenu">
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
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notifications;
