import React, { forwardRef } from "react";
import { Button, Badge } from "react-bootstrap";
import "Views/Header/style.css";

const NotificationToggle = forwardRef(({ count, ...rest }, ref) => {
  const badge = count > 0 && (
    <Badge variant="secondary">{count > 9 ? "9+" : count}</Badge>
  );
  return (
    <div
      ref={ref}
      {...rest}
      className="navbar-right-button notification-color notifications-button"
    >
      POWIADOMIENIA {badge}
    </div>
  );
});

export default NotificationToggle;
