import React, { useState } from "react";
import { DEFAULT_INPUT } from "constants/other";
import { Button, Col, Form } from "react-bootstrap";
import FormGroup from "components/FormGroup";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";

const Filters = ({
  setFilter,
  disabled,
  typeList,
  statusList,
  count,
  filters,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(DEFAULT_INPUT);
  const [status, setStatus] = useState(DEFAULT_INPUT);

  const filter = (e) => {
    e.preventDefault();
    const typeFilter = type !== DEFAULT_INPUT ? type : undefined;
    const statusFilter = status !== DEFAULT_INPUT ? status : undefined;
    const usernameFilter = username !== "" ? username : undefined;
    const emailFilter = email !== "" ? email : undefined;
    setFilter({
      ...filters,
      username: usernameFilter,
      email: emailFilter,
      type: typeFilter,
      status: statusFilter,
    });
  };

  const deleteFilter = () => {
    setUsername("");
    setEmail("");
    setStatus(DEFAULT_INPUT);
    setType(DEFAULT_INPUT);
    setFilter({ ...filters, username: "", email: "", type: "", status: "" });
  };

  return (
    <Form className="search__form" onSubmit={filter}>
      <Form.Row>
        <FormGroup
          as={Col}
          xs={12}
          md={6}
          header="Nazwa użytkownika"
          val={username}
          setVal={setUsername}
          type="text"
          id="username"
        />
        <FormGroup
          as={Col}
          xs={12}
          md={6}
          header="Email"
          val={email}
          setVal={setEmail}
          type="text"
          id="email"
        />
        <Form.Group as={Col} xs={12} md={6} controlId="category">
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            type="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled>{DEFAULT_INPUT}</option>
            {Object.values(userStatuses).map((status) => (
              <option key={status} value={status}>
                {statusList(status)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={6} controlId="type">
          <Form.Label>Typ użytkownika:</Form.Label>
          <Form.Control
            as="select"
            type="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled>{DEFAULT_INPUT}</option>
            {Object.values(userTypes).map((type) => (
              <option key={type} value={type}>
                {typeList(type)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Button
        type="submit"
        className="mr-3"
        variant="primary"
        disabled={disabled}
      >
        {disabled ? "Ładowanie..." : "Filtruj użytkowników"}
      </Button>
      <Button
        variant="outline-primary"
        className="mr-3"
        onClick={deleteFilter}
        disabled={disabled}
      >
        {disabled ? "Ładowanie..." : "Wyczyść filtry"}
      </Button>
      {count !== 0 && (
        <small className="search__countText">{`Liczba znalezionych użytkowników: ${count}`}</small>
      )}
    </Form>
  );
};

export default Filters;
