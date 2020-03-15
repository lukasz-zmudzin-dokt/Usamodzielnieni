import React, { useState, useEffect } from 'react';
import { Nav, Dropdown, Col } from "react-bootstrap";
import NotificationItemContainer from './NotificationItemContainer';
import NotificationItem from './NotificationItem';
import NotificationToggle from './NotificationToggle';
import "./Notifications.css";

const getNotifications = async (token) => {
    let url = "https://usamo-back.herokuapp.com/notifications/.../"; // TODO
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (response.status === 200) {
        return response.json().then(notifications => mapNotifications(notifications));
    } else {
        throw response.status;
    }
}

const mapNotifications = (notifications) => notifications.map(not => ({
    id: not.id,
    path: getPath(not.type),
    title: not.title,
    time: new Date(not.time)
    // TODO
}))

const getPath = (type) => {
    switch (type) {
        case 'cv': return '/cvEditor';
        case 'jobs': return '/';
        default: return '/';
    }
}

const deleteNotification = async (id, token) => {
    let url = "https://usamo-back.herokuapp.com/notifications/.../"; // TODO
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, {
        method: "DELETE",
        body: {
            notifications: { id }
        },
        headers
    });

    if (response.status === 200) {
        return response.status;
    } else {
        throw response.status;
    }
}
const deleteNotifications = async (notifications, token) => {
    await Promise.all(notifications.map(async (not) => {
        try {
            await deleteNotification(not, token)
        } catch (e) {
            console.log(e);
        }
    }));
}

const Notifications = ({ location, token, ...rest }) => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        () => { 
            loadNotifications(token);
        },
        [token]
    );

    const loadNotifications = async (token) => {
        setIsLoading(true);
        let loadedNotifications;
        try {
            loadedNotifications = await getNotifications(token);
        } catch {
            loadedNotifications = [];
        }
        setNotifications(loadedNotifications);
        setIsLoading(false);
    }

    const toRemove = notifications.filter(not => not.path === location.pathname);
    if (toRemove.length) {
        setNotifications(notifications.filter(not => not.path !== location.pathname));
        deleteNotifications(toRemove, token);
    }

    const clearNotifications = e => {
        setNotifications([]);
        deleteNotifications(notifications, token);
    }

    const removeNotification = id => {
        setNotifications(notifications.filter(not => not.id !== id));
        deleteNotifications(notifications.filter(not => not.id === id), token);
    }

    return (
        <Dropdown as={Nav.Item} {...rest}>
            <Dropdown.Toggle as={NotificationToggle} count={isLoading ? 0 : notifications.length} />
            <Dropdown.Menu data-testid="dropdownMenu">
                {
                    isLoading ? (<Dropdown.Item disabled="true">Ładowanie...</Dropdown.Item>) : (
                        <>
                            {
                                !notifications.length ? (<Dropdown.Item as={Col} disabled>Brak powiadomień</Dropdown.Item>) : (
                                    <div className="notifications-container">
                                        {notifications.map(notification => (
                                            <NotificationItemContainer 
                                                key={notification.id}
                                                data-testid={`dropdownItem${notification.id}`}
                                                onClick={removeNotification}
                                                notification={notification}
                                            >
                                                <Dropdown.Item as={NotificationItem} notification={notification} />
                                            </NotificationItemContainer>
                                        ))}
                                    </div>
                                )
                            }
                            <Dropdown.Divider />
                            <Dropdown.Item key="clearButton" onClick={clearNotifications} disabled={!notifications.length}>Wyczyść</Dropdown.Item>
                        </>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Notifications;