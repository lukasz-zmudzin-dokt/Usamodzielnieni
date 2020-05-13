import React from "react";
import { Accordion, Card } from "react-bootstrap";
import OfferPosition from "./OfferPosition";

const OfferList = ({ offers }) => {
    return (
        <Accordion>
            {offers.map((offer) =>
                <Card className="border-left-0 border-right-0 border-bottom-0" key={offer.id}>
                    <Accordion.Toggle as={Card.Header} eventKey={offer.id}>
                        {offer.offer_name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={offer.id}>
                        <OfferPosition offer={offer} key={offer.id} />
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    );
};

export default OfferList;