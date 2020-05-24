import React from "react";
import { Button, Row, Col, Alert, Form } from "react-bootstrap";
import { VideoField } from "components";
const CVEditorTab = ({
  title,
  video,
  children,
  onPrevClick,
  onNextClick,
  onSubmit,
  comments,
  loading,
  error,
  showComments,
  isNew,
  disabled = false,
  errVid,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="CVEditor__videoContainer">
        <VideoField videoItem={video} errVid={errVid} />
      </div>
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
                {disabled
                  ? "Ładowanie..."
                  : isNew
                  ? "Generuj CV"
                  : "Zapisz zmiany i generuj CV"}
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CVEditorTab;
