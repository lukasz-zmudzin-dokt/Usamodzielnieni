import React, {useEffect, useState} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

const AdminRegisterButton = ({userType}) => (
    userType === "Staff" ? (
        <LinkContainer to="/newAccount/staff">
            <Button variant="primary">
                Zarejestruj administratora
            </Button>
        </LinkContainer>
    ) : null
);

export default AdminRegisterButton;