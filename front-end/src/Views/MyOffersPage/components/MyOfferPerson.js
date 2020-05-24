import React, { useState, useContext } from "react";
import { Alert, Button, ListGroup, Row } from "react-bootstrap";
import { DetailsItem } from "components";
import { UserContext } from "context";
import proxy from "config/api";
import "Views/MyOffersPage/style.css";
import {
  setReadStatus,
  setUnreadStatus,
} from "Views/MyOffersPage/functions/apiCalls";

const MyOfferPerson = ({ person }) => {
  const [error, setError] = useState(false);
  const [read, setRead] = useState(person.was_read);
  const context = useContext(UserContext);

  const showCV = async (e, cvUrl) => {
    e.preventDefault();
    let url = proxy.plain + cvUrl;
    window.open(url, "_blank");
  };

  const checkViewed = async () => {
    let newViewed = !read;
    setRead(newViewed);
    try {
      newViewed
        ? await setReadStatus(context.token, person.id)
        : await setUnreadStatus(context.token, person.id);
      setRead(newViewed);
    } catch (e) {
      setError(true);
    }
  };
  const message = error ? (
    <Alert variant="danger" className="w-100">
      Ups, wystąpił błąd.
    </Alert>
  ) : null;

  return (
    <ListGroup.Item
      className={`justify-content-end ${!read ? "not-read" : ""}`}
    >
      {message ? message : null}
      <Row className="justify-content-end">
        <DetailsItem label="Imię i nazwisko">
          {person.first_name} {person.last_name}
        </DetailsItem>
        <DetailsItem label="email">{person.email}</DetailsItem>
        <Button
          variant="primary"
          className="m-2"
          onClick={(e) => showCV(e, person.cv_url)}
        >
          Pokaż CV
        </Button>
        <Button variant="outline-primary" className="m-2" onClick={checkViewed}>
          {read ? "Oznacz jako nieprzeczytane" : "Oznacz jako przeczytane"}
        </Button>
      </Row>
    </ListGroup.Item>
  );
};

export default MyOfferPerson;
