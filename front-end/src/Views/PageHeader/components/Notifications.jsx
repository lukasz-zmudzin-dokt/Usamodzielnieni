import React, { useState, useEffect } from 'react';
import { Nav, Dropdown, Col } from "react-bootstrap";
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
    time: not.time
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
    try {
        await Promise.all(notifications.map(async (not) => await deleteNotification(not, token)));
    } catch (e) {
        console.log(e);
    }
}

const Notifications = ({ location, token, ...rest }) => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        () => { loadNotifications(token) },
        [token]
    );

    const loadNotifications = async (token) => {
        setIsLoading(true);
        let loadedNotifications;
        try {
            loadedNotifications = await getNotifications(token);
        } catch {
            loadedNotifications = [
                { id: 1, path: getPath('cv'), title: 'Rozpatrzono CV', time: new Date() },
                { id: 2, path: getPath('jobs'), title: 'Dostępne nowe oferty pracy', time: new Date() }
            ]
        }
        setNotifications(loadedNotifications);
        setIsLoading(false);
    }

    const toRemove = notifications.filter(not => not.path === location.pathname);
    if (toRemove.length) {
        deleteNotifications(toRemove, token);
        setNotifications(notifications.filter(not => not.path !== location.pathname));
    }

    const clearNotifications = e => {
        deleteNotifications(notifications, token);
        setNotifications([]);
    }

    const removeNotification = id => {
        deleteNotifications(notifications.filter(not => not.id === id), token);
        setNotifications(notifications.filter(not => not.id !== id));
    }

    return (
        <Dropdown as={Nav.Item} {...rest}>
            <Dropdown.Toggle as={NotificationToggle} count={isLoading ? 0 : notifications.length} />
            <Dropdown.Menu>
                {
                    isLoading ? (<div></div>) : (
                        <>
                            {
                                !notifications.length ? (<Dropdown.Item as={Col} disabled>Brak powiadomień</Dropdown.Item>) : (
                                    <div class="notifications-container">
                                        {notifications.map(notification => (
                                            <Dropdown.Item as={NotificationItem} notification={notification} onClick={removeNotification} />
                                        ))}
                                    </div>
                                )
                            }
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={clearNotifications} disabled={!notifications.length}>Wyczyść</Dropdown.Item>
                        </>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Notifications;