import React from 'react';
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotificationItem.css"

const NotificationItem = ({ notification, onClick, ...rest }) => {
    const formatDate = (date) => date.toLocaleDateString(undefined, {})
    const onButtonClick = e => {
        onClick(notification.id)
    }

    return (
        <ButtonGroup className="notificationItem">
            <Link to={notification.path} {...rest}>
                <div>{ notification.title }</div>
                <small>{ formatDate(notification.time) }</small>
            </Link>
            <Button onClick={onButtonClick} variant="light">X</Button>
        </ButtonGroup>
    )
}

export default NotificationItem;