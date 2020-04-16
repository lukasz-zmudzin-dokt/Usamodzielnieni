import React, {useEffect, useState} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

const AdminRegisterButton = ({userType}) => {
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        setAllowed(userType === "Staff");
    });

    return (
        allowed ? (
            <LinkContainer to="/staff/register">
                <Button className="mt-3" variant="primary" block>
                    Zarejestruj administratora
                </Button>
            </LinkContainer>
        ) : null
    );
};

export default AdminRegisterButton;