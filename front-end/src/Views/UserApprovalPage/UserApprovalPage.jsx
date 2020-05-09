import React, { useState, useEffect, useContext,useRef } from "react";
import { UserContext,AlertContext } from "context";
import { Alert, Card, Container } from "react-bootstrap";
import { getUsersToApprove } from "./functions/apiCalls";
import UserDetails from "./components/UserDetails";

const UserApprovalPage = () => {

    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState("");
    const alertC = useRef(useContext(AlertContext));

    useEffect(() => {
        const loadUsers = async (token, setUsers) => {
            setLoading(true);
            try {
                let res = await getUsersToApprove(token);
                setUsers(res);
                setLoading(false);
            } catch (e) {
                alertC.current.showAlert("Błąd. Nie udało się załadować użytkowników do zaakceptowania.")
                setLoading(false);
            }
        };
        loadUsers(context.token, setUsers);
    }, [context.token]);

    const message = loading ? (
        <Alert variant="info" className="m-3">Ładuję...</Alert>
    ) : users.length === 0 ? (
        <Alert variant="info" className="m-3">Brak kont do zatwierdzenia</Alert>
    ) : null;

    return (
        <Container>
            <Card>
                <Card.Header as={"h2"}>
                    Konta do zatwierdzenia
                    </Card.Header>
                <Card.Body className="p-0">
                    {message ? message : null}
                    <UserDetails users={users} activeUser={activeUser} setActiveUser={setActiveUser} />
                </Card.Body>
            </Card>

        </Container>
    );
};

export default UserApprovalPage;