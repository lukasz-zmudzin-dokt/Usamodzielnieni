import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { UserPicture } from 'components';

const ChatInfo = ({ chat, ...rest }) => {
    return (
        <Row {...rest} className="chatInfo">
            <Col xs="auto" className="chatInfo__picture">
                <UserPicture user={chat.user}/>
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
