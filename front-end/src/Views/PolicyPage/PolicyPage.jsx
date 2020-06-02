import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { GeneralPolicy } from "docs/GeneralPolicy";
import { PrivacyAndCookies } from "docs/PrivacyAndCookies";

const PolicyPage = () => {
  const params = useParams();

  return (
    <Container>
      <Card>
        <Card.Body className="text-justify">
          <Card.Title as="h2">
            {params.doc === "policy" ? "Regulamin" : "Polityka prywatności"}
          </Card.Title>
          {params.doc === "policy"
            ? GeneralPolicy.call()
            : PrivacyAndCookies.call()}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PolicyPage;
