import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context";
import { Alert, Card, Container } from "react-bootstrap";
import OfferList from "./components/OfferList";

const OfferApprovalPage = () => {

    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [offers, setOffers] = useState([]);
    const [activeOffer, setActiveOffer] = useState("");

    useEffect(() => {
        const loadOffers = async(token) => {
            /* #TODO integracja z api
            setLoading(true);
            try {
                let res = await getOffers(token);
                setOffers(res);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
            }*/
        };
        loadOffers(context.token);
    }, [context.token]);

    const message = loading ? (
        <Alert variant="info" className="m-3">Ładuję...</Alert>
    ) : error ? (
        <Alert variant="danger" className="m-3">Ups, wystąpił błąd.</Alert>
    ) : offers.length === 0 ? (
        <Alert variant="info" className="m-3">Brak ofert do zatwierdzenia</Alert>
    ) : null;

    return (
        <Container>
            <Card>
                <Card.Header as={"h2"}>
                    Oferty pracy do zatwierdzenia
                </Card.Header>
                <Card.Body className="p-0">
                    { message ? message : null }
                    <OfferList offers={offers} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OfferApprovalPage;