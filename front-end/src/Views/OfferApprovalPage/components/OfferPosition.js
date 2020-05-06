import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "context";
import { Alert, Button, Card, ListGroup, Row } from "react-bootstrap";
import { DetailsItem } from "components";
import { getOffer, setOfferApproved, setOfferRejected } from "Views/OfferApprovalPage/apiCalls";

const OfferPosition = ({ offer, activeOffer }) => {

    const context = useContext(UserContext);
    const [offerDetails, setOfferDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);

    useEffect(() => {
        const loadOfferDetails = async (token, offerId) => {
            /*#TODO połączyć z api jak będzie
            setLoading(true);
            try {
                let res = await getOffer(token, offerId);
                setOfferDetails(res);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
            }*/
        };
        if(activeOffer === offer.id) {
            loadOfferDetails(context.token, offer.id);
        }
    }, [context.token, activeOffer]);

    const approveOffer = async (e, token, offerId) => {
        e.preventDefault();
        /*#TODO połączyć z api jak będzie
        try {
            let res = setOfferApproved(token, offerId);
        } catch (e) {
            setError(true);
        }*/
    };

    const rejectOffer = async (e, token, offerId) => {
        e.preventDefault();
        /*#TODO połączyć z api jak będzie
        try {
            let res = setOfferRejected(token, offerId);
        } catch (e) {
            setError(true);
        }*/
    };

    const message = loading ? (
        <Alert className="mb-0" variant="info">Ładuję...</Alert>
    ) : error ? (
        <Alert className="mb-0" variant="danger">Ups, wystąpił błąd...</Alert>
    ) : approved ? (
        <Alert className="mb-0" variant="success">Oferta zatwierdzona pomyślnie.</Alert>
    ) : rejected ? (
        <Alert className="mb-0" variant="success">Oferta odrzucona pomyślnie.</Alert>
    ) : null;

    return (
        message ? message : (
            <Card.Body>
                i tu będą szczegóły oferty
            </Card.Body>
        )
    );

};

export default OfferPosition;