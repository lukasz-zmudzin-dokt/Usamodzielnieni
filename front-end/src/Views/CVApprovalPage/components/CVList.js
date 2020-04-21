import React from "react";
import {Alert, Col, ListGroup, Row} from "react-bootstrap";
import CVPosition from "./CVPosition";
import "Views/CVApprovalPage/style.css"

class CVList extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {
            cvs
        } = this.props;
        return (
            cvs.length > 0 ? (
                <ListGroup variant="flush">
                    <ListGroup.Item className="hide-on-mobile">
                        <Row>
                            <Col md={3} xs={12}><b>Imię i nazwisko</b></Col>
                            <Col md={4} xs={12}><b>Email</b></Col>
                            <Col md={5} xs={12}/>
                        </Row>
                    </ListGroup.Item>
                    {cvs.map((cv) => {
                        return (
                            <ListGroup.Item key={cv.cv_id}>
                                <CVPosition cv={cv}/>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
                ) : (
                    <Alert variant="info">Aktualnie nie ma żadnych CV do akceptacji.</Alert>
                )
        );
    }
}

export default CVList;