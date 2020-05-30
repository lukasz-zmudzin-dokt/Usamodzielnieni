import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

const NotificationItem = ({ notification, ...rest }) => {
  const formatDate = (date) => date.toLocaleDateString(undefined, {});

  return (
    <Link to={notification.path} {...rest}>
      <div>{notification.title}</div>
      {notification.unread && (
        <Badge variant="light" className="mr-1">
          Nowe
        </Badge>
      )}
      <small>{formatDate(notification.time)}</small>
    </Link>
  );
};

export default NotificationItem;
