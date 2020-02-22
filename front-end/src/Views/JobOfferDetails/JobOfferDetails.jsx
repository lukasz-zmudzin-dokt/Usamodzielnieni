import React, { useState } from 'react';
import { Container, Card } from "react-bootstrap";
import "./style.css";

const JobOfferDetails = props => {
    const [offer, setOffer] = useState({
        id: "1",
        title: "Stolarz poszukiwany!",
        description: "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
        companyName: "Rębacze z Cintry sp. z o.o.",
        firstName: "Jarosław",
        lastName: "Psikuta",
        email: "paniewidzisztamsnakońcu@gmail.com",
        phone: "133792137"
    });

    return (
        <Container>
            <Card>
            <Card.Header as="h2">Szczegóły oferty pracy</Card.Header>
            <Card.Body>
                <h3>{offer.title}</h3>
                <div>{offer.description}</div>
            </Card.Body>
            </Card>
        </Container>
    )
}

export default JobOfferDetails;