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
];

class CVLegend extends React.Component {
    render() {
        return (
            <Row className="cv_legend mb-4">
                <Col md={2} xs={6}><b>Imię</b></Col>
                <Col md={2} xs={6}><b>Nazwisko</b></Col>
                <Col md={4} xs={12}><b>Email</b></Col>
                <Col md={4} xs={8}/>
            </Row>
        );
    }
}


class CVDetails extends React.Component {
    render() {
        const { cv } = this.props;

        function downloadCV() {
            console.log("pobieram CV o id " + cv.id);
        }

        function acceptCV() {
            console.log("akceptuję CV o id " + cv.id);
        }
        function improveCV() {
            console.log("poprawiam CV o id " + cv.id);
        }

        return (
            <Row className="mt-3">
                <Col xs={6} md={2}>{cv.firstName}</Col>
                <Col xs={6} md={2}>{cv.lastName}</Col>
                <Col xs={12} md={4}>
                    <a href={"mailto:" + cv.email}> {cv.email} </a>
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-end">
                    <Button variant="primary m-1 p-1" onClick={downloadCV}>Pobierz</Button>
                    <Button variant="success m-1 p-1" onClick={acceptCV}>Akceptuj</Button>
                    <Button variant="warning m-1 p-1" onClick={improveCV}>Popraw</Button>
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