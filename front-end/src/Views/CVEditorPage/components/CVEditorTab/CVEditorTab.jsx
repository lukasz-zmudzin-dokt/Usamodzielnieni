import React from "react";
import { Button, Row, Col, Alert, Form } from "react-bootstrap";

const CVEditorTab = ({
  title,
  movie,
  children,
  onPrevClick,
  onNextClick,
  onSubmit,
  comments,
  loading,
  error,
  showComments,
  disabled = false,
}) => (
  <div>
    <h3>{title}</h3>
    <img className="CVEditorTab__img" src={movie} alt="" />

    {!showComments ? null : loading ? (
      <Alert variant="info">Wczytuję uwagi...</Alert>
    ) : error ? (
      <Alert variant="danger">
        Wystąpił błąd podczas wczytywania uwag do CV.
      </Alert>
    ) : comments ? (
      <Alert variant="info">
        <Alert.Heading>Uwagi:</Alert.Heading>
        <p className="mb-0">{comments}</p>
      </Alert>
    ) : (
      <Alert variant="success">Brak uwag do tej części CV.</Alert>
    )}

    {children}
    <Row>
      <Col xs={12} md={6}>
        <Button
          className="form_navigation_prev"
          onClick={(e) => onPrevClick(e)}
          disabled={!onPrevClick}
          block
        >
          ← Wstecz
        </Button>
      </Col>
      <Col xs={12} md={6}>
        {onNextClick ? (
          <Button
            className="form_navigation_next"
            onClick={(e) => onNextClick(e)}
            block
          >
            Dalej →
          </Button>
        ) : (
          <Form onSubmit={onSubmit}>
            <Button
              variant="success"
              type="submit"
              id="saveButton"
              block
              disabled={disabled}
            >
              {disabled ? "Ładowanie..." : "Generuj CV"}
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  </div>
);

export default CVEditorTab;
