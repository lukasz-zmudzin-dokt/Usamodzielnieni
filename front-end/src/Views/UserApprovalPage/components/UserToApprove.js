import React from "react";
import {Button, Card, Col, ListGroup} from "react-bootstrap";
import { acceptUser, rejectUser} from "../functions/functions";

const UserToApprove = ({ user })  => {
    return (
        <Col sm={12} md={6} lg={4} xl={3} className="pb-3">
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="pl-0 pr-0"><a href={"mailto: " + user.email}>{user.email}</a></ListGroup.Item>
                        <ListGroup.Item className="pl-0 pr-0">
                            <p className="mb-1">{user.facility_name}</p>
                            <p className="mb-1">{user.facility_address}</p>
                        </ListGroup.Item>
                    </ListGroup>
            </Card.Body>
                <Card.Footer>
                        <Button variant="success" onClick={e => acceptUser(e, user.id)}>Akceptuj</Button>
                        <Button variant="danger" className="ml-1" onClick={e => rejectUser(e, user.id)}>Odrzuć</Button>
                </Card.Footer>
        </Card>
        </Col>
    );
};

export default UserToApprove;