import React, { useState } from 'react';
import { Nav, Dropdown, Button, Badge, Col } from "react-bootstrap";
import NotificationItem from './NotificationItem';

const NotificationToggle = props => (
    <Button variant="light" {...props}>
        Powiadomienia { props.count > 0 && (<Badge variant="secondary">{props.count}</Badge>) }
    </Button>
)

const Notifications = props => {
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Rozpatrzono CV', time: new Date() },
        { id: 2, title: 'Dostępne nowe oferty pracy', time: new Date() }
    ]);

    const clearNotifications = e => {
        setNotifications([]);
    }

    const removeNotification = id => setNotifications(
        notifications.filter(not => not.id !== id)
    )

    return (
        <Dropdown as={Nav.Item} {...props}>
            <Dropdown.Toggle as={NotificationToggle} count={notifications.length} />
            <Dropdown.Menu>
                { 
                    notifications.length ? notifications.map(notification => (
                        <Dropdown.Item as={NotificationItem} notification={notification} onClick={removeNotification}/>
                    )) 
                    : (<Col>Brak powiadomień</Col>) 
                }
                <Dropdown.Divider />
                <Dropdown.Item onClick={clearNotifications} disabled={!notifications.length}>Wyczyść</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Notifications;