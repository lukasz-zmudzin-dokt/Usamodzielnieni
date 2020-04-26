import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

const CVApprovalButton = ({userType}) => (
    userType === "Staff" ? (
        <LinkContainer to="/cvApproval">
            <Button variant="primary" className="ml-3">
                Zobacz CV do akceptacji
            </Button>
        </LinkContainer>
    ) : null
);

export default CVApprovalButton;