import React from 'react';
import { Button, Badge } from "react-bootstrap";

const NotificationToggle = ({ count, ...rest }) => (
    <Button variant="light" {...rest}>
        Powiadomienia { count > 0 && (<Badge variant="secondary">{count > 9 ? '9+' : count}</Badge>) }
    </Button>
)

export default NotificationToggle;