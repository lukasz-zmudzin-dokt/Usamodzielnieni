import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { staffTypes } from "constants/staffTypes";

const AdminOfferApprovalButton = ({ user }) => (
    user.type === "Staff" && user.data.group_type.includes(staffTypes.JOBS) ? (
        <LinkContainer to="/offerApproval">
            <Button variant="primary" className="ml-3">
                Akceptuj oferty pracy
            </Button>
        </LinkContainer>
    ) : null
);

export default AdminOfferApprovalButton;