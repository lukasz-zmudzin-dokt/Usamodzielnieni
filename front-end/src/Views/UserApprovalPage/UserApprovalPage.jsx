import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "context";
import {Accordion, Alert, Card, Container} from "react-bootstrap";
import UserToApprove from "./components/UserToApprove";
import { getUsersToApprove } from "./functions/apiCalls";

const UserApprovalPage = () => {

    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async(token, setUsers) => {
            setLoading(true);
            try {
                let res = await getUsersToApprove(token);
                setUsers(res);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        loadUsers(context.token, setUsers);
    }, [context.token]);

    const message = loading ? (
        <Alert variant="info" className="m-3">Ładuję...</Alert>
    ) : error ? (
        <Alert variant="danger" className="m-3">Ups, wystąpił błąd.</Alert>
    ) : users.length === 0 ? (
        <Alert variant="info" className="m-3">Brak kont do zatwierdzenia</Alert>
    ) : null;

    return (
        <Container>
            <Accordion>
                <Card>
                    <Card.Header as={"h2"}>
                        Konta do zatwierdzenia
                    </Card.Header>
                    <Card.Body className="p-0">
                        { message ? message : null }
                        { users.map((user) => <UserToApprove user={user} key={user.id} />) }
                    </Card.Body>
                </Card>
            </Accordion>
        </Container>
    );
};

export default UserApprovalPage;