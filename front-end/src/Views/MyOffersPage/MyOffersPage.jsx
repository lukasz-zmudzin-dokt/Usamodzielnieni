import React, {useContext, useEffect, useState,useRef} from "react";
import {Accordion, Alert, Card, Container} from "react-bootstrap";
import { UserContext,AlertContext } from "context";
import { getMyOffers } from "./functions/apiCalls";
import MyOffer from "./components/MyOffer";

const MyOffersPage = () => {

    const context = useContext(UserContext);
    const alertC = useRef(useContext(AlertContext));
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeOffer, setActiveOffer] = useState("");
    
    useEffect(() => {
        const loadOffers = async(token, setOffers) => {
            setLoading(true);
            try {
                let res = await getMyOffers(token);
                if(res.count > 0) {
                    setOffers(res.results);
                }
            } catch (err) {
                console.log(err);
                alertC.current.showAlert("Nie udało się załadować ofert.");
            }
            setLoading(false);
        };
        loadOffers(context.token, setOffers);
    }, [context.token]);

    const message = loading ? (
        <Alert variant="info" className="m-3">Ładuję...</Alert>
    ) : offers.length === 0 ? (
        <Alert variant="info" className="m-3">Brak ofert</Alert>
    ) : null;

    return (
        <Container>
            <Card>
                <Card.Header as={"h2"}>
                    Moje Oferty
                </Card.Header>
                <Card.Body className="p-0">
                    { message ? message : null }
                    <Accordion>
                        { offers.map((offer) => <MyOffer offer={offer} key={offer.id} activeOffer={activeOffer} setActiveOffer={setActiveOffer} />) }
                    </Accordion>
                </Card.Body>
            </Card>
        </Container>
    );

};

export default MyOffersPage;