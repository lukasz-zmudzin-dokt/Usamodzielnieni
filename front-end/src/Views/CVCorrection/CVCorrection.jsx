import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Row, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCV } from "Views/CVCorrection/functions";
import { UserContext } from "context";
import { CVRender, CorrectionForm } from "./_components";

const CVCorrection = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [url, setURL] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadCV = async () => {
      let res;
      try {
        res = await getCV(id, token);
        setURL(res);
      } catch (err) {
        console.log(err);
        setMsg("Nie udało się pobrać CV.");
      }
    };
    loadCV();
  }, [id, token]);

  return (
    <Container>
      <Card>
        <Card.Header as="h2" className="offerForm__header">
          Uwagi do CV
        </Card.Header>
        <Card.Body>
          <Row className="m-0">
            <CVRender url={url} msg={msg} />
            <CorrectionForm id={id} token={token} />
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CVCorrection;
