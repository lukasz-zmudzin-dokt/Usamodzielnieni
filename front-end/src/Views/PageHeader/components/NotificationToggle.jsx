import React, { forwardRef } from "react";
import { Button, Badge } from "react-bootstrap";

const NotificationToggle = forwardRef(({ count, ...rest }, ref) => {
  const badge = count > 0 && (
    <Badge variant="secondary">{count > 9 ? "9+" : count}</Badge>
  );
  return (
    <Button ref={ref} variant="light" {...rest}>
      Powiadomienia {badge}
    </Button>
  );
});

export default NotificationToggle;
