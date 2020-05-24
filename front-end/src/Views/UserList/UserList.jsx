import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "context/UserContext";
import proxy from "config/api";
import { Alert, Card, Container, ListGroup } from "react-bootstrap";
import UserInfo from "./components/UserInfo";
import Filters from "./components/Filters";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "components";

const getUsers = async (token, filters) => {
  const { type, status, email, username } = filters;
  const typeQ = type ? "&type=" + type : "";
  const statusQ = status ? "&status=" + status : "";
  const emailQ = email ? "&email=" + email : "";
  const usernameQ = username ? "&username=" + username : "";

  const query = `?page=${filters.page}&page_size=${filters.pageSize}${typeQ}${statusQ}${emailQ}${usernameQ}`;

  const url = proxy.account + "admin/user_list/all/" + query;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { headers, method: "GET" });
  if (res.status === 200) {
    return await res.json();
  } else {
    throw res.status;
  }
};

const UserList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const context = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const mapUsers = (list) => {
      return list.map((user) => ({
        id: user.id,
        email: user.email,
        username: user.username,
        status: user.status,
        type: user.type,
        dateJoined: new Date(user.date_joined),
        lastLogin: user.last_login,
      }));
    };
    const loadList = async (token) => {
      setLoading(true);
      setDisabled(true);
      setError(false);
      try {
        const res = await getUsers(token, filters);
        setCount(res.count);
        setUsers(mapUsers(res.results));
      } catch (e) {
        console.log(e);
        e !== 404 ? setError(true) : setUsers([]);
      } finally {
        setLoading(false);
        setDisabled(false);
      }
    };
    loadList(context.token);
  }, [context.token, filters]);

  const mapStatus = (status) => {
    switch (status) {
      case userStatuses.VERIFIED:
        return "Zweryfikowany";
      case userStatuses.AWAITING:
        return "Oczekuje na weryfikację";
      case userStatuses.REJECTED:
        return "Odrzucony";
      case userStatuses.BLOCKED:
        return "Zablokowany";
      default:
        return "Nieznany status";
    }
  };

  const mapType = (type) => {
    switch (type) {
      case userTypes.STAFF:
        return "Administrator";
      case userTypes.EMPLOYER:
        return "Pracodawca";
      case userTypes.STANDARD:
        return "Podopieczny";
      case userTypes.SPECIALIST:
        return "Specjalista";
      default:
        return "Nieznany typ";
    }
  };

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  const msg = error ? (
    <Alert variant="danger">
      Wystąpił błąd podczas ładowania listy użytkowników.
    </Alert>
  ) : loading ? (
    <Alert variant="info">Ładowanie listy użytkowników...</Alert>
  ) : (
    users.length === 0 && (
      <Alert variant="info">Brak użytkowników spełniających kryteria.</Alert>
    )
  );

  const setUser = (user) => {
    setUsers((prevUsers) =>
      prevUsers.map((prevUser) => (prevUser.id === user.id ? user : prevUser))
    );
  };

  const deleteUser = (user) => {
    setUsers((prevUsers) =>
      prevUsers.filter((prevUser) => prevUser.id !== user.id)
    );
  };

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Lista użytkowników</Card.Header>
        <Filters
          count={users.length}
          setFilter={setFilters}
          disabled={disabled}
          typeList={mapType}
          statusList={mapStatus}
          filters={filters}
        />
        {msg ? (
          <Card.Body>{msg}</Card.Body>
        ) : (
          <ListGroup variant="flush">
            {users.map((user) => (
              <ListGroup.Item key={user.id}>
                <UserInfo
                  user={user}
                  setUser={setUser}
                  deleteUser={deleteUser}
                  mapType={mapType}
                  mapStatus={mapStatus}
                />
              </ListGroup.Item>
            ))}
            <Pagination
              current={filters.page}
              max={Math.ceil(count / filters.pageSize)}
            />
          </ListGroup>
        )}
      </Card>
    </Container>
  );
};

export default UserList;
