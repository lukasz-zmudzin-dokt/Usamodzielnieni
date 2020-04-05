import React from "react";
import { Link } from "react-router-dom";
import {Container, Card, Row, Col, Button, ListGroup} from "react-bootstrap";
import { UserContext } from "context/UserContext";

import './style.css';
import CVStatus from "./components/CVStatus";
import { getUserCVs } from "./functions/getUserCVs";
import { showCV } from "./functions/showCV";

class MyCVsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cvs: [] };
    }

    componentDidMount() {
        getUserCVs(this.context.token).then(response => response !== undefined ? this.setState({ cvs : response }) : null);
    }

    render() {
        return (
            <Container className="mt-4">
                <div className="center width-100">
                    <Card>
                        <Card.Header><h4>Moje CV</h4></Card.Header>
                        <Card.Body>
                            <Row className="pl-4 pb-4 pr-4">
                                <Col><h6>Identyfikator CV</h6></Col>
                                <Col><h6>Status</h6></Col>
                                <Col><h6>Akcje</h6></Col>
                            </Row>
                            <ListGroup variant="flush">
                                {this.state.cvs.map((cv) =>
                                    <ListGroup.Item key={cv.cv_id}>
                                    <Row className="pt-3">
                                        <Col>{cv.cv_id}</Col>
                                        <Col><CVStatus wants_verification={cv.wants_verification} is_verified={cv.is_verified} /></Col>
                                        <Col>
                                            <Link to={"/cvEditor/" + cv.cv_id}><Button variant="info">Edytuj</Button></Link>
                                            {' '}
                                            <Button variant="primary" onClick={e => showCV(this.context.token, cv.cv_id)}>Pobierz</Button>
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    }
}

MyCVsPage.contextType = UserContext;

export default MyCVsPage;