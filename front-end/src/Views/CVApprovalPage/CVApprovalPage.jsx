import React from "react";
import { Card, Container } from "react-bootstrap";
import "./style.css";
import { getCVs } from "./functions/getCVs";
import {UserContext} from "../../context/UserContext";
import CVApprovalBody from "./components/CVApprovalBody";

class CVApprovalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cvs: [] };
    }
    static ContextType = UserContext;

    componentDidMount() {
        getCVs().then(response => this.setState({ cvs: response}));
    }

    render() {
        return (
            <Container fluid>
                    <Card className="center">
                        <Card.Header className="border pb-4"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body className="border">
                            <CVApprovalBody cvs={this.state.cvs} />
                        </Card.Body>
                    </Card>
            </Container>
        )
    };
}

export default CVApprovalPage;