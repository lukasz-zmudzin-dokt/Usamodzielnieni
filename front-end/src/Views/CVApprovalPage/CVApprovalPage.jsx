import React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import "./style.css";

const cvs = [
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
];

class CVLegend extends React.Component {
    render() {
        return (
            <Row className="cv_legend mb-3">
                <Col md={1}>ID</Col>
                <Col md={2}>Imię</Col>
                <Col md={2}>Nazwisko</Col>
                <Col md={3}>Email</Col>
                <Col md={2}>Pobierz</Col>
                <Col md={2}>Akcje</Col>
            </Row>
        );
    }
}


class CVDetails extends React.Component {
    render() {
        const { cv } = this.props;

        function downloadCV(id) {
            console.log("pobieram CV o id " + id);
        }

        function acceptCV(id) {
            console.log("akceptuję CV o id " + id);
        }
        function improveCV(id) {
            console.log("poprawiam CV o id " + id);
        }

        return (
            <Row className="mt-3">
                <Col md={1}>{cv.id}</Col>
                <Col md={2}>{cv.firstName}</Col>
                <Col md={2}>{cv.lastName}</Col>
                <Col md={3}>
                    <a href={"mailto:" + cv.email}> {cv.email} </a>
                </Col>
                <Col md={2}>
                    <Button variant="primary" onClick={downloadCV(cv.id)}>Pobierz CV</Button>
                </Col>
                <Col md={1}>
                    <Button variant="success" onClick={acceptCV(cv.id)}>Akceptuj</Button>
                </Col>
                <Col md={1}>
                    <Button variant="warning" onClick={improveCV(cv.id)}>Popraw</Button>
                </Col>
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
                            <CVLegend />
                            {cvs.map((value, index) => {
                                return (
                                    <CVDetails cv={value} key={value.id}/>
                                )
                            })}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    };
}



export default CVApprovalPage;