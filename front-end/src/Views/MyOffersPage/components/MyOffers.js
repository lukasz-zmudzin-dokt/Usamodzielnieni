import React from "react";
import {Accordion} from "react-bootstrap";
import MyOffer from "./MyOffer";

const MyOffers = ({ offers = [], token, component })  => {
    return (
        <Accordion defaultActiveKey="0">
            {offers.map((value) => {
                return (
                    <MyOffer offer={value} key={value.id} token={token} component={component}/>
                )
            })}
        </Accordion>
    );
};

export default MyOffers;