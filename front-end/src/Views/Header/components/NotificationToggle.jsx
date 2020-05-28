import React, { forwardRef } from "react";
import { Button} from "react-bootstrap";

const NotificationToggle = forwardRef(({ count, ...rest }, ref) => {
  const badge = count > 0 && (
    <span className="font">{count > 9 ? "9+" : count}</span>
  );
  return (
    <Button
      ref={ref}
      variant="light"
      {...rest}
      className="notifications-button notification-color navbar-right-button border-0"
    >
      <img alt="Ikona dzwonka" src="/bell.svg" /> {badge}
    </Button>
  );
});

export default NotificationToggle;
