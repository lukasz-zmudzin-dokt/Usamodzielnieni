import React, { useState, useEffect, useContext} from "react";
import { UserContext,AlertContext } from "context";
import {Alert, Card, Container} from "react-bootstrap";
import { getUsersToApprove } from "./functions/apiCalls";
import UserDetails from "./components/UserDetails";

const UserApprovalPage = () => {

    const context = useContext(UserContext);
    const contextA = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState("");

    const loadUsers = async (token, setUsers) => {
        setLoading(true);
        try {
            let res = await getUsersToApprove(token);
            setUsers(res);
            setLoading(false);
        } catch (e) {
            contextA.changeMessage("Ups, wystąpił błąd.");
            contextA.changeVisibility(true);
            setLoading(false);
        }
    };

    useEffect(() => {
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
                        { message ? message : null }
                        <UserDetails users={users} activeUser={activeUser} setActiveUser={setActiveUser} sliceUser={() => loadUsers(context.token,setUsers)}/>
                    </Card.Body>
                </Card>

        </Container>
    );
};

export default UserApprovalPage;