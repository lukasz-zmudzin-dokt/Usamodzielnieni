import React from "react";
import "./style.css";
import {Accordion, Button, Card, Col, Container, Row} from "react-bootstrap";

const offers = [
    {
        id: 0,
        name: "Siepacz Poszukiwany!",
        description: "Poszukujemy zdolnej osoby do rozparcelowywania sczapek drewna które potem trafi na polskie stoły.",
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
        description: "Mamy problem z jeżami i poszukujemy kogoś kto by je zwyzywał od mrówek żeby poszły sobie w cholerę. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, enim vel egestas aliquam, leo leo lobortis massa, id feugiat odio lectus ac urna. Nam dictum urna velit, ut dictum erat eleifend vitae. Integer dapibus sit amet est at tempor. Aenean fermentum ultrices sem, a feugiat augue ultricies aliquet. Cras quis nulla sed nisl egestas lacinia vel a lectus. Sed eu tempus turpis, et finibus ex. Maecenas mollis, ante quis porttitor tristique, felis mauris viverra nibh, id porttitor purus tellus at nunc. Praesent egestas enim justo, non consectetur odio feugiat ut. Aliquam erat volutpat. Nam volutpat justo sed commodo dictum. Vivamus purus risus, suscipit in nisl id, sodales laoreet velit.\n" +
            "\n" +
            "Pellentesque dignissim, odio quis feugiat placerat, lectus nisl molestie nibh, sed posuere ligula lorem eget orci. Nunc at pellentesque lectus. Cras egestas non mauris vel elementum. Donec fermentum nibh id tincidunt pretium. Integer condimentum sapien quam, et pellentesque enim auctor a. Maecenas eu hendrerit turpis. Ut mattis purus nec pulvinar dapibus. Sed vel fermentum massa.",
        answers: [
            {
                id: 1,
                firstName: "Ola",
                lastName: "Kwiatek",
                email: "kwiatola@olakwiat.nl"
            }
        ]
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

class MyOffersPage extends React.Component {
    render() {
        return(
            <Container>
                <div className="background">
                    <Card className="my-offers-card no-border">
                        <Card.Header className="border pb-4"><h3>Moje oferty</h3></Card.Header>
                        <Card.Body className="border">
                            <MyOffers>

                            </MyOffers>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default MyOffersPage;