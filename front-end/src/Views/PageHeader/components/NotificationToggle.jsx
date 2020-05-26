import React, { forwardRef } from "react";
import { Button, Badge } from "react-bootstrap";
import "Views/Header/style.css";

const NotificationToggle = forwardRef(({ count, ...rest }, ref) => {
  const badge = count > 0 && (
    <Badge variant="secondary">{count > 9 ? "9+" : count}</Badge>
  );
  return (
    <Button
      ref={ref}
      variant="light"
      {...rest}
      className="notifications-button notification-color navbar-right-button"
    >
      POWIADOMIENIA {badge}
    </Button>
  );
});

export default NotificationToggle;
