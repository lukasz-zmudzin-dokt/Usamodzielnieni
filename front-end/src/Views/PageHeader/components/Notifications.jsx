import React, { useState } from 'react';
import { Nav, Dropdown, Button, Badge } from "react-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap';

const NotificationItem = props => (
    <IndexLinkContainer to="/cvEditor">
        <Nav.Link {...props}>
            { props.notification.title }
        </Nav.Link>
    </IndexLinkContainer>
)

const NotificationToggle = props => (
    <Button variant="light" {...props}>
        Powiadomienia { props.count > 0 && (<Badge variant="secondary">{props.count}</Badge>) }
    </Button>
)

const Notifications = props => {
    const [notifications, setNotifications] = useState([
        { title: 'Rozpatrzono CV' },
        { title: 'Dostępne nowe oferty pracy' }
    ]);

    const clearNotifications = e => {
        setNotifications([]);
    }

    return (
        <Dropdown as={Nav.Item} {...props}>
            <Dropdown.Toggle as={NotificationToggle} count={notifications.length} />
            <Dropdown.Menu>
                { 
                    notifications.length ? notifications.map(notification => (
                        <Dropdown.Item as={NotificationItem} notification={notification} />
                    )) 
                    : (<Nav.Link disabled>Brak powiadomień</Nav.Link>) 
                }
                <Dropdown.Divider />
                <Dropdown.Item onClick={clearNotifications}>Wyczyść</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Notifications;