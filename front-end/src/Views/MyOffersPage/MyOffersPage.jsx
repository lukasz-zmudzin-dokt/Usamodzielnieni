import React from "react";
import "./style.css";
import {Card, Container} from "react-bootstrap";
import MyOffers from "./components/MyOffers";

const offers = [
    {
        id: 0,
        name: "Siepacz Poszukiwany!",
        answers: [
            {
                id: 0,
                firstName: "Maciej",
                lastName: "Kozłowski",
                email: "maciej.kozlowski@gmail.dom"
            },
            {
                id: 1,
                firstName: "Ola",
                lastName: "Kwiatek",
                email: "kwiatola@olakwiat.nl"
            }
        ]
    },
    {
        id: 1,
        name: "Zaklinacz jeży",
        answers: [
            {
                id: 1,
                firstName: "Ola",
                lastName: "Kwiatek",
                email: "kwiatola@olakwiat.nl"
            }
        ]
    },
    {
        id: 2,
        name: "Poszukiwany asystent do podjęcia działań prowadzących do ujęcia sprawcy porysowania pewnego samochodu marki Opel o numerach rejestracyjnych tak długich że nawet tego nie doczytasz",
        answers: [
            {
                id: 0,
                firstName: "Maciej",
                lastName: "Kozłowski",
                email: "maciej.kozlowski@gmail.dom"
            },
            {
                id: 1,
                firstName: "Ola",
                lastName: "Kwiatek",
                email: "kwiatola@olakwiat.nl"
            },
            {
                id: 2,
                firstName: "Aleksander",
                lastName: "Jewaroksymoronowski",
                email: "jewaroksymoronski4life@domena.dede"
            },
            {
                id: 3,
                firstName: "Kuba",
                lastName: "Pec",
                email: "pec@pac.pic"
            }
        ]
    },
    {
        id: 3,
        name: "Do tego ogłoszenia i tak nikt się nie zgłosi",
        answers: []
    }
];

class MyOffersPage extends React.Component {
    render() {
        return(
            <Container>
                <div className="background">
                    <Card className="my-offers-card no-border">
                        <Card.Header className="border"><h3>Moje oferty</h3><p className="pt-3">Kliknij zakładkę, by wyświetlić osoby zainteresowane daną ofertą.</p></Card.Header>
                        <Card.Body className="border">
                            <MyOffers offers={offers}/>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default MyOffersPage;