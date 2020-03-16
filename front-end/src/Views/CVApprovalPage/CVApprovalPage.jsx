import React from "react";
import { Card, Container } from "react-bootstrap";
import "Views/MyOffersPage/style.css";
import CVLegend from "./components/CVLegend";
import CVDetails from "./components/CVDetails";
import { getCVs } from "./functions/getCVs";

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


    state = {
        cvs: cvs    // will change with backend in the future
    };
    /*  will change with backend in the future
    componentDidMount() {
        getCVs().then(response => this.setState({ cvs: response.results}));
    }
    */

    render() {
        return (
            <Container>
                <div className="background">
                    <Card className="main-card no-border">
                        <Card.Header className="border pb-4"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body className="border">
                            <CVLegend />
                            {this.state.cvs.map((value) => {
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