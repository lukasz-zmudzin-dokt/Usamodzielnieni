import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CookiesModal = ({ hide }) => {
  return (
    <Card className="cookiesModal">
      <Card.Header>
        <Card.Title>Używamy plików cookies</Card.Title>
      </Card.Header>
      <Card.Body>
        W celu administrowania i ulepszania naszej strony, świadczenia usług na
        Twoją rzecz oraz analizy ruchu na stonie jak również dostosowywania
        treści naszej strony do Twoich potrzeb, używamy plików cookies. Poniżej
        możesz zgodzić się na przechowywanie niektórych plików cookies. Żeby
        dowiedzieć się więcej, sprawdź naszą
        <Link className="" to="/regulations/privacy_and_cookies">
          {" "}
          Politykę Prywatności i Cookies
        </Link>
      </Card.Body>
      <Card.Footer as={Row} className="justify-content-end m-0">
        <Button variant="primary" onClick={hide}>
          Akceptuje i przechodzę do strony
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default CookiesModal;
