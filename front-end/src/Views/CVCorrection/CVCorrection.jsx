import React, { useEffect, useContext, useRef, useState } from "react";
import { Container, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCV } from "Views/CVCorrection/functions";
import { UserContext } from "context";
import { CVRender, CorrectionForm } from "./_components";

const CVCorrection = () => {
  const [width, setWidth] = useState(0);
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const cardEl = useRef(null);

  const setCardSize = () => {
    let width;
    if (window.innerWidth >= 768) {
      width = cardEl.current.getBoundingClientRect().width / 1.8;
    } else width = cardEl.current.getBoundingClientRect().width - 15;
    setWidth(width);
  };

  useEffect(() => {
    setCardSize();
    const loadCV = async () => {
      let res;
      try {
        res = await getCV(id, token);
      } catch (err) {}
    };
    loadCV();
  }, [id, token]);

  return (
    <Container>
      <Card ref={cardEl}>
        <Card.Header as="h2" className="offerForm__header">
          Uwagi do CV:
        </Card.Header>
        <Card.Body>
          <Row className="align-center">
            <CVRender width={width} />
            <CorrectionForm data={{ id, token }} />
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CVCorrection;
