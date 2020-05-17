import React from "react";
import { Link } from "react-router-dom";

const NotificationItem = ({ notification, ...rest }) => {
  const formatDate = (date) => date.toLocaleDateString(undefined, {});

  return (
    <Link to={notification.path} {...rest}>
      <div>{notification.title}</div>
      <small>{formatDate(notification.time)}</small>
    </Link>
  );
};

export default NotificationItem;
