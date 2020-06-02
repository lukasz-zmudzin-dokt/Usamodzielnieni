import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CookiesModal = () => {
  const [show, setShow] = useState(true);
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Używamy plików cookies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        W celu administrowania i ulepszania naszej strony, świadczenia usług na
        Twoją rzecz oraz analizy ruchu na stonie jak również dostosowywania
        treści naszej strony do Twoich potrzeb, używamy plików cookies. Poniżej
        możesz zgodzić się na przechowywanie niektórych plików cookies. Żeby
        dowiedzieć się więcej, sprawdź naszą
        <Link className="" to="">
          Politykę Prywatności i Cookies
        </Link>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Akceptuje i przechodzę do strony
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CookiesModal;
