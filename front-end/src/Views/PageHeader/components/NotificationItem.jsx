import React from 'react';
import { Nav, Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer   } from 'react-router-bootstrap';
import "./NotificationItem.css"

const NotificationItem = ({ notification, onClick, ...props }) => {
    const formatDate = (date) => date.toLocaleDateString(undefined, {})
    const onButtonClick = e => {
        onClick(notification.id)
    }

    return (
        <ButtonGroup className="notificationItem">
            <LinkContainer   to="/cvEditor">
                <Nav.Link onClick={onButtonClick} {...props}>
                    <div>{ notification.title }</div>
                    <small>{ formatDate(notification.time) }</small>
                </Nav.Link>
            </LinkContainer  >
            <Button onClick={onButtonClick} variant="light">X</Button>
        </ButtonGroup>
    )
}

export default NotificationItem;