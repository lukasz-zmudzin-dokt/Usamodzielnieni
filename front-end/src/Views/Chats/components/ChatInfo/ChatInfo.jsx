import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import UserIcon from "components/UserIcon";

const ChatInfo = ({ chat, ...rest }) => {
    return (
        <Row {...rest}>
            <Col xs="auto">
                <UserIcon />
            </Col>
            <Col >
                <h5>{chat.name}</h5>
                <IndexLinkContainer to={`/chats/${chat.id}`}>
                    <Button>Pokaż szczegóły</Button>
                </IndexLinkContainer>
            </Col>
        </Row>
    )
}

export default ChatInfo
