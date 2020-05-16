import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";
import {staffTypes} from "constants/staffTypes";

const AdminRegisterButton = ({user}) => (
    user.type === "staff" && user.data.group_type.includes(staffTypes.VERIFICATION) ? (
        <LinkContainer to="/newAccount/staff">
            <Button variant="primary">
                Zarejestruj administratora
            </Button>
        </LinkContainer>
    ) : null
);

export default AdminRegisterButton;