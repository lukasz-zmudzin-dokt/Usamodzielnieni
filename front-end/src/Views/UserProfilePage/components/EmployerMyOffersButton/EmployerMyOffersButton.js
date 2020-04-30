import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const EmployerMyOffersButton = ({ user }) => (
    user.type === "Employer" ? (
        <LinkContainer to="/myOffers">
            <Button variant="primary">
                Zgłoszenia do moich ofert
            </Button>
        </LinkContainer>
    ) : null
);

export default EmployerMyOffersButton;