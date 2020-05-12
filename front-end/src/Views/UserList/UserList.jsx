import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "context/UserContext";
import qs from 'query-string';
import proxy from "config/api";
import {Alert, Card, Container, ListGroup} from "react-bootstrap";
import Filter from "../JobOffersPage/_components/Filter";

const getUsers = async (token, filters) => {
    const {type, status, email, username} = filters;
    const typeQ = type ? "type=" + type : "";
    const statusQ = status ? "status=" + status : "";
    const emailQ = email ? "email=" + email : "";
    const usernameQ = username ? "username=" + username : "";

    const query = `${typeQ}${statusQ}${emailQ}${usernameQ}`;

    const url = proxy.account + "admin/user_list/all/" + query;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const res = await fetch(url, {headers, method: "GET"});
    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const UserListButton = () => {
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const context = useContext(UserContext);

    useEffect(() => {
        const loadList = async (token) => {
            setLoading(true);
            try {
                const res = await getUsers(token, filters);
                setUsers(mapUsers(res));
            } catch(e) {
                console.log(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadList(user.token);
    }, [user.token, filters]);

    const mapUsers = list => {
        return list.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            status: user.status,
            type: user.type,
            dateJoined: user.date_joined,
            lastLogin: user.last_login
        }))
    };

    const msg = error ? (
        <Alert variant="danger">Wystąpił błąd podczas ładowania listy użytkowników.</Alert>
    ) : loading ? (
        <Alert variant="info">Ładowanie listy użytkowników...</Alert>
    ) : (
        users.length === 0 && (
            <Alert variant="info">Brak użytkowników spełniających kryteria.</Alert>
        )
    );

    return (
        <Container>
            <Card>
                <Card.Header as="h2">Lista użytkowników</Card.Header>
                <Filter setFilters={setFilters} disabled={loading} />
                {msg ? (
                    <Card.Body>{msg}</Card.Body>
                ) : (
                    <>
                        <ListGroup variant="flush">
                            {users.map(user => (
                                <ListGroup.Item key={user.id}>
                                    <UserInfo user={user} context={context} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </>
                )}
            </Card>
        </Container>
    );
};