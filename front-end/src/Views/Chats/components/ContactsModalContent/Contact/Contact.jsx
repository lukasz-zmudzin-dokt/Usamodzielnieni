import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';


const Contact = ({ contact }) => {
    return (
        <Row>
            <Col>
                <h5>{contact.firts_name}</h5>
            </Col>
            <Col>
                <IndexLinkContainer to={`/chats/${contact.id}`}>
                    <Button>Nowa wiadomość</Button>
                </IndexLinkContainer>
            </Col>
        </Row>
    )
}

export default Contact