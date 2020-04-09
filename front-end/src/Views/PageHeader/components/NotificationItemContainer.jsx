import React from 'react';
import { Button, ButtonGroup } from "react-bootstrap";

const NotificationItemContainer = ({ notification, onClick, children, ...rest }) => {
    const onButtonClick = e => {
        onClick(notification.id)
    }

    return (
        <ButtonGroup className="notificationItemContainer" {...rest}>
            {children}
            <Button onClick={onButtonClick} variant="light">X</Button>
        </ButtonGroup>
    )
}

export default NotificationItemContainer;