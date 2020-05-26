import React, { useEffect, useContext, useState, Suspense } from "react";
import { Container, Card, Row, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCV } from "Views/CVCorrection/functions";
import { UserContext } from "context";
import { CorrectionForm } from "./_components";

const CVRender = React.lazy(() => import("./_components/CVRender"));

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
        setURL(res.url);
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
            <Suspense
              fallback={
                <div>
                  <Alert variant="info">Ładowanie...</Alert>
                </div>
              }
            >
              <CVRender url={url} msg={msg} />
            </Suspense>
            <CorrectionForm id={id} token={token} />
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CVCorrection;
