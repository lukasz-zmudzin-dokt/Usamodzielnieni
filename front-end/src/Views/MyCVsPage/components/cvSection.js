import React, { useState, useRef, useContext } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import CVStatus from "./CVStatus";
import { IndexLinkContainer } from "react-router-bootstrap";
import { getCVUrl } from "../functions/getCVUrl";
import proxy from "config/api";
import { AlertContext } from "context";
import { DeletionModal } from "components";
import ChangeCVNameModal from "./ChangeCVNameModal.jsx";

const showCV = async (cvId, alertC, token) => {
  try {
    const r = await getCVUrl(token, cvId);
    let url = proxy.plain + r.url;
    window.open(url, "_blank");
  } catch (e) {
    alertC.current.showAlert(
      "Ups, coś poszło nie tak. Nie można wyświetlić CV."
    );
  }
};

const CVSection = ({ cv, token, cutCV }) => {
  const [disabled, setDisabled] = useState(false);
  const alertC = useRef(useContext(AlertContext));
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);

  const handleDeletion = async () => {
    setDeletionConfirmed(false);
    setDisabled(true);
    const res = await cutCV(cv.cv_id);
    if (res === false) {
      setDisabled(false);
    }
  };

  const setCVNewName = (CVNewName) => {
    cv.name = CVNewName;
  };
  const showCVNewNameModal = () => {
    setShowChangeNameModal(true);
  };

  const handleOnClick = () => {
    setShowModal(true);
  };

  if (deletionConfirmed) handleDeletion();

  return (
    <ListGroup.Item key={cv.cv_id}>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={setDeletionConfirmed}
        question={"Czy na pewno chcesz usunąć to CV?"}
      />
      <ChangeCVNameModal
        show={showChangeNameModal}
        setShow={setShowChangeNameModal}
        cvId={cv.cv_id}
        setCVNewName={setCVNewName}
      />
      <Row className="d-flex align-items-center">
        <Col xs={12} md={4}>
          {cv.name}
        </Col>
        <Col xs={12} md={2}>
          <CVStatus
            was_reviewed={cv.was_reviewed}
            is_verified={cv.is_verified}
          />
        </Col>
        <Col xs={12} md={6} className="text-right">
          <Button
            variant="primary"
            onClick={(e) => showCV(cv.cv_id, alertC, token)}
          >
            Zobacz CV
          </Button>
          <Button variant="info" onClick={showCVNewNameModal} className="m-1">
            Zmień nazwę
          </Button>
          <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
            <Button variant="info" className="mx-2">
              Edytuj
            </Button>
          </IndexLinkContainer>
          <Button variant="danger" disabled={disabled} onClick={handleOnClick}>
            {disabled ? "..." : "Usuń CV"}
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CVSection;
