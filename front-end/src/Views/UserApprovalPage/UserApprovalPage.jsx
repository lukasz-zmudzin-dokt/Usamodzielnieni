import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context";
import { Alert, Card, Container } from "react-bootstrap";
import { getUsersToApprove } from "./functions/apiCalls";
import UserDetails from "./components/UserDetails";

const UserApprovalPage = () => {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    const loadUsers = async (token) => {
      setLoading(true);
      try {
        let res = await getUsersToApprove(token);
        setUsers(res.results);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    loadUsers(context.token);
  }, [context.token]);

  const message = loading ? (
    <Alert variant="info" className="m-3">
      Ładuję...
    </Alert>
  ) : error ? (
    <Alert variant="danger" className="m-3">
      Ups, wystąpił błąd.
    </Alert>
  ) : users.length === 0 ? (
    <Alert variant="info" className="m-3">
      Brak kont do zatwierdzenia
    </Alert>
  ) : null;

  return (
    <Container>
      <Card>
        <Card.Header as={"h2"}>Konta do zatwierdzenia</Card.Header>
        <Card.Body className="p-0">
          {message ? message : null}
          <UserDetails
            users={users}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserApprovalPage;
