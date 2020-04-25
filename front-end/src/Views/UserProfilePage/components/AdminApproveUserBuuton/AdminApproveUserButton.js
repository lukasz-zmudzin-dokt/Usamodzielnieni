import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const AdminApproveUserButton = ({ userType }) => (
    userType === "Staff" ? (
        <LinkContainer to="/userApproval">
            <Button variant="primary"  className="ml-3">
                Zaakceptuj rejestrację nowych kont
            </Button>
        </LinkContainer>
    ) : null
);

export default AdminApproveUserButton;