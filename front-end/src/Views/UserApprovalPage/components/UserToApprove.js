import React, {useContext, useState} from "react";
import {Accordion, Alert, Button, Card, ListGroup, Row} from "react-bootstrap";
import {UserContext} from "context";
import {getUserDetails, setUserApproved, setUserRejected} from "Views/UserApprovalPage/functions/apiCalls";
import {DetailsItem} from "components";

const UserToApprove = ({ user }) => {
    const context = useContext(UserContext);
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);

    const loadUserDetails = async (e, token, userId) => {
        e.preventDefault();
        if(userDetails.length === 0) {  // nie pobieraj danych jeżeli już je wcześniej ładowałeś
            setLoading(true);
            try {
                let res = await getUserDetails(token, userId);
                setUserDetails(res);
            } catch (err) {
                setError(true);
            }
            setLoading(false);
        }
    };

    const approveUser = async (e, token, userId) => {
        e.preventDefault();
        try {
            let res = await setUserApproved(token, userId);
            if(res === "User successfully verified.") {
                setApproved(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    const rejectUser = async (e, token, userId) => {
        e.preventDefault();
        try {
            let res = await setUserRejected(token, userId);
            if(res === "User status successfully set to not verified.") {
                setRejected(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    const message = loading ? (
        <Alert variant="info">Ładuję...</Alert>
    ) : error ? (
        <Alert variant="danger">Ups, wystąpił błąd...</Alert>
    ) : approved ? (
        <Alert variant="success">Konto zatwierdzone pomyślnie.</Alert>
    ) : rejected ? (
        <Alert variant="success">Konto odrzucone pomyślnie.</Alert>
    ) : null;

    return (
        <Card className="border-left-0 border-right-0 border-bottom-0 ">
            <Accordion.Toggle as={Card.Header} eventKey={user.id} onClick={e => loadUserDetails(e, context.token, user.id)}>
                {user.username} ({user.type})
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={user.id}>
                {message ? message : (
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <DetailsItem md={4} label="Nazwa użytkownika">{userDetails.username}</DetailsItem>
                                    <DetailsItem label="Imię">{userDetails.first_name}</DetailsItem>
                                    <DetailsItem label="Nazwisko">{userDetails.last_name}</DetailsItem>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <DetailsItem label="Email">{userDetails.email}</DetailsItem>
                                    <DetailsItem label="Telefon">{userDetails.phone_number}</DetailsItem>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <DetailsItem label="Ośrodek">{userDetails.facility_name}</DetailsItem>
                                    <DetailsItem label="Adres">{userDetails.facility_address}</DetailsItem>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="justify-content-center">
                                    <Button onClick={e => approveUser(e, context.token, user.id)} variant="success">Akceptuj</Button>
                                    <Button onClick={e => rejectUser(e, context.token, user.id)} variant="danger" className="ml-3">Odrzuć</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>)
                }
            </Accordion.Collapse>
        </Card>
    );
};

export default UserToApprove;