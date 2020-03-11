import React from "react";
import { Card, Container } from "react-bootstrap";
import "./style.css";
import CVLegend from "./components/CVLegend";
import CVDetails from "./components/CVDetails";

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

class CVApprovalPage extends React.Component {
    render() {
        return (
            <Container>
                <div className="cv_approval_background">
                    <Card className="cv_approval_card no-border">
                        <Card.Header className="cv_approval_card_title border pb-4"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body className="border">
                            <CVLegend />
                            {cvs.map((value) => {
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