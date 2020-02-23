import React from "react";
import "./style.css";
import {Accordion, Button, Card, Col, Container, Row} from "react-bootstrap";

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

class InterestedPerson extends React.Component {
    render() {
        const { person } = this.props;
        function downloadCV(id) {
            console.log("ściągnij cv o takim id:" + id);
        }

        return (
            <Row className="mt-3">
                <Col xs={6} md={3}>{person.firstName}</Col>
                <Col xs={6} md={3}>{person.lastName}</Col>
                <Col xs={12} md={4}>
                    <a href={"mailto:" + person.email}> {person.email} </a>
                </Col>
                <Col xs={12} md={2}>
                    <Button variant="primary m-1 p-1" onClick={downloadCV(person.id)}>Zobacz CV</Button>
                </Col>
            </Row>
        );
    }
}

class MyOffer extends React.Component {
    render() {
        const { offer } = this.props;

        return(
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={offer.id}>
                    {offer.name}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={offer.id}>
                    <Card.Body>
                        <NoInterest answers={offer.answers} />
                        <MyOffersLegend answers={offer.answers} />
                        {offer.answers.map((value, key) => {
                            return (
                                <InterestedPerson person={value} key={value.id}/>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

class MyOffers extends React.Component {
    render() {
        return(
            <Accordion defaultActiveKey="0">
                {offers.map((value, index) => {
                    return (
                        <MyOffer offer={value} key={value.id}/>
                    )
                })}
            </Accordion>
        );
    }
}

class MyOffersLegend extends React.Component {
    render() {
        const { answers } = this.props;
        if(answers.length > 0) {
            return (
                <Row className="mt-3 person-row">
                    <Col xs={6} md={3}><b>Imię</b></Col>
                    <Col xs={6} md={3}><b>Nazwisko</b></Col>
                    <Col xs={12} md={4}><b>Email</b></Col>
                    <Col xs={12} md={2}><b>CV</b></Col>
                </Row>
            );
        } else {
            return null;
        }
    }
}

class NoInterest extends React.Component {
    render() {
        const { answers } = this.props;
        if(answers === undefined) {
            return (
                <Row className="ml-1">Do tego ogłoszenia nie zgłosił się jeszcze nikt chętny.</Row>
            );
        } else {
            if(answers.length === 0) {
                return (
                    <Row className="ml-1">Do tego ogłoszenia nie zgłosił się jeszcze nikt chętny.</Row>
                );
            } else {
                return null;
            }
        }
    }
}

class MyOffersPage extends React.Component {
    render() {
        return(
            <Container>
                <div className="background">
                    <Card className="my-offers-card no-border">
                        <Card.Header className="border"><h3>Moje oferty</h3><p className="pt-3">Kliknij zakładkę, by wyświetlić osoby zainteresowane daną ofertą.</p></Card.Header>
                        <Card.Body className="border">
                            <MyOffers />
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default MyOffersPage;