import React, {useContext, useState} from "react";
import {Accordion, Card, Alert, ListGroup, Row, Button} from "react-bootstrap";
import "Views/MyOffersPage/style.css";
import { UserContext } from "context/UserContext";
import { getOfferPeople } from "../functions/apiCalls";
import MyOfferPerson from "./MyOfferPerson";
import {Link} from "react-router-dom";

const MyOffer = ({ offer }) => {

    const context = useContext(UserContext);
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadOfferPeople = async (e, token, offerId) => {
        e.preventDefault();
        if(people.length === 0) {
            setLoading(true);
            try {
                let res = await getOfferPeople(token, offerId);
                console.log(res);
                if(res.length > 0) {
                    setPeople(res);
                }
            } catch (err) {
                setError(true);
            }
            setLoading(false);
        }
    };

    const message = loading ? (
        <Alert variant="info">Ładuję...</Alert>
    ) : error ? (
        <Alert variant="danger">Ups, wystąpił błąd...</Alert>
    ) : people.length === 0 ? (
        <Alert className="mb-0" variant="info">Brak zgłoszeń.</Alert>
    ) : null;

    return (
        <Card className="border-left-0 border-right-0 border-bottom-0">
            <Accordion.Toggle as={Card.Header} eventKey={offer.id} onClick={e => loadOfferPeople(e, context.token, offer.id)}>
                {offer.offer_name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={offer.id}>
                <Card.Body className="p-0">
                    { message ? message : null }
                    <ListGroup>
                        { people.map((value) => (<MyOfferPerson person={value} key={value.user_id} />)) }
                        <ListGroup.Item>
                            <Row className="justify-content-center">
                                <Link to={"/jobOffers/" + offer.id}>
                                    <Button>Pokaż ofertę</Button>
                                </Link>
                                <Link to={"/offerForm/" + offer.id}>
                                    <Button className="ml-3">Edytuj ofertę</Button>
                                </Link>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );

};

export default MyOffer;