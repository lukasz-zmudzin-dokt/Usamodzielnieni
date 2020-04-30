import React, { useEffect, useContext, useRef, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCV } from "Views/CVCorrection/functions";
import { UserContext } from "context";
import { CVRender } from "./components";

const CVCorrection = () => {
  const [width, setWidth] = useState(0);
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const cardEl = useRef(null);

  const setCardSize = () => {
    let width;
    if (window.innerWidth >= 768) {
      width = cardEl.current.getBoundingClientRect().width / 2;
    } else width = cardEl.current.getBoundingClientRect().width;
    setWidth(width);
  };

  useEffect(() => {
    setCardSize();
    const loadCV = async () => {
      let res;
      try {
        res = await getCV(id, token);
      } catch (err) {}
      console.log(res);
    };
    loadCV();
  }, [id, token]);

  return (
    <Container>
      <Card ref={cardEl}>
        <Card.Header as="h2" className="offerForm__header">
          Sprawdź CV
        </Card.Header>
        <Card.Body>
          <CVRender width={width} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CVCorrection;
