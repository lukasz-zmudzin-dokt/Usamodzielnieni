import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";
import {staffTypes} from "constants/routes";

const CVApprovalButton = ({userType}) => (
    userType.type === "Staff" && userType.data.group_type === staffTypes.CV ? (
        <LinkContainer to="/cvApproval">
            <Button variant="primary" className="ml-3">
                Zobacz CV do akceptacji
            </Button>
        </LinkContainer>
    ) : null
);

export default CVApprovalButton;