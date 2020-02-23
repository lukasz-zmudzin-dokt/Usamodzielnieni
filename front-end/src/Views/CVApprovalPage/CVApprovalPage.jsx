import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import "./style.css";

const cvs = [
    {
        number: 0,
        firstName: "Maciej",
        lastName: "Kozłowski",
        date: "09.18.2019",
        mail: "maciej.kozlowski@gmail.dom"
    },
    {
        number: 1,
        firstName: "Ola",
        lastName: "Kwiatek",
        date: "11.02.2020",
        mail: "kwiatola@olakwiat.nl"
    }
];

class CVDetails extends React.Component {
    render() {
        const { cv } = this.props;
        return (
            <Row>
                <Col>{cv.number}</Col>
                <Col>{cv.firstName}</Col>
                <Col>{cv.lastName}</Col>
                <Col>{cv.date}</Col>
                <Col>{cv.mail}</Col>
                <Col>AKCEPTUJ</Col>
                <Col>POPRAW</Col>
            </Row>
        );
    }
}

class CVApprovalPage extends React.Component {
    render() {
        return (
            <Container>
                <div className="cv_approval_background">
                    <Card className="cv_approval_card">
                        <Card.Header className="cv_approval_card_title"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body>
                            <h1>lalala</h1>
                            <CVDetails cv={cvs[0]} />
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    };
}

export default CVApprovalPage;