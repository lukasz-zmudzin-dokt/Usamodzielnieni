import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const AdminApproveUserButton = ({ user }) => (
    user.type === "Staff" ? (
        <LinkContainer to="/userApproval">
            <Button variant="primary"  className="ml-3">
                Akceptuj nowych użytkowników
            </Button>
        </LinkContainer>
    ) : null
);

export default AdminApproveUserButton;