import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";
import {staffTypes} from "constants/routes";

const AdminRegisterButton = ({userType}) => (
    userType.type === "Staff" && userType.data.group_type === staffTypes.VERIFICATION ? (
        <LinkContainer to="/newAccount/staff">
            <Button variant="primary">
                Zarejestruj administratora
            </Button>
        </LinkContainer>
    ) : null
);

export default AdminRegisterButton;