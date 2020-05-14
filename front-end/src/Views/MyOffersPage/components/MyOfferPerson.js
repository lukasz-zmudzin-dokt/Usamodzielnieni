import React from "react";
import { Button, ListGroup, Row } from "react-bootstrap";
import { DetailsItem } from "components";
import proxy from "config/api";

const MyOfferPerson = ({ person }) => {
  const showCV = async (e, cvUrl) => {
    e.preventDefault();
    let url = proxy.plain + cvUrl;
    window.open(url, "_blank");
  };

  return (
    <ListGroup.Item>
      <Row className="justify-content-end">
        <DetailsItem label="Imię i nazwisko">
          {person.first_name} {person.last_name}
        </DetailsItem>
        <DetailsItem label="email">{person.email}</DetailsItem>
        <Button
          variant="primary"
          className="mr-2"
          onClick={(e) => showCV(e, person.cv_url)}
        >
          Pokaż CV
        </Button>
      </Row>
    </ListGroup.Item>
  );
};

export default MyOfferPerson;
