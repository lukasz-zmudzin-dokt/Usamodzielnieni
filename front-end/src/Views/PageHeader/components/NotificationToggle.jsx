import React, { forwardRef } from "react";
import { Button, Badge } from "react-bootstrap";

const NotificationToggle = forwardRef(({ count, ...rest }, ref) => (
  <Button ref={ref} variant="light" {...rest}>
    Powiadomienia{" "}
    {count > 0 && <Badge variant="secondary">{count > 9 ? "9+" : count}</Badge>}
  </Button>
));

export default NotificationToggle;
