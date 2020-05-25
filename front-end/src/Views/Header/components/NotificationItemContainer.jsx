import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "Views/Header/style.css";

const NotificationItemContainer = ({
  notification,
  onClick,
  children,
  ...rest
}) => {
  const onButtonClick = (e) => {
    onClick(notification.id);
  };

  return (
    <ButtonGroup className="notificationItemContainer" {...rest}>
      {children}
      <Button onClick={onButtonClick} variant="light" className="notification-color-light border-0">
        X
      </Button>
    </ButtonGroup>
  );
};

export default NotificationItemContainer;
