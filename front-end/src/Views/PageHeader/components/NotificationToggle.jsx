import React from 'react';
import { Button, Badge } from "react-bootstrap";

const NotificationToggle = props => (
    <Button variant="light" {...props}>
        Powiadomienia { props.count > 0 && (<Badge variant="secondary">{props.count}</Badge>) }
    </Button>
)

export default NotificationToggle;