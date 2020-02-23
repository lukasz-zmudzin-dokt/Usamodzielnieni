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
            <Row className="cv_legend mb-4">
                <Col md={1} xs={3}><b>ID</b></Col>
                <Col md={2} xs={4}><b>Imię</b></Col>
                <Col md={2} xs={5}><b>Nazwisko</b></Col>
                <Col md={3} xs={12}><b>Email</b></Col>
                <Col md={4} xs={8}><b>Akcje</b></Col>
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
                <Col xs={2} md={1}>{cv.id}</Col>
                <Col xs={5} md={2}>{cv.firstName}</Col>
                <Col xs={5} md={2}>{cv.lastName}</Col>
                <Col xs={12} md={3}>
                    <a href={"mailto:" + cv.email}> {cv.email} </a>
                </Col>
                <Col xs={12} md={4}>
                    <Button variant="primary m-1 p-1" onClick={downloadCV(cv.id)}>Pobierz</Button>
                    <Button variant="success m-1 p-1" onClick={acceptCV(cv.id)}>Akceptuj</Button>
                    <Button variant="warning m-1 p-1" onClick={improveCV(cv.id)}>Popraw</Button>
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
                    <Card className="cv_approval_card no-border">
                        <Card.Header className="cv_approval_card_title border pb-4"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body className="border">
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