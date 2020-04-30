import React, { useEffect, useContext } from "react";
import { Container, Card } from "react-bootstrap";
import { FormGroup } from "components";
import { useParams } from "react-router-dom";
import { getCV } from "Views/CVCorrection/functions";
import { UserContext } from "context";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CVCorrection = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  console.log(token);
  console.log(id);
  useEffect(() => {
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
      <Card>
        <Card.Header as="h2" className="offerForm__header">
          Sprawdź CV
        </Card.Header>
        <Card.Body>
          <Document
            className="CVCorrection__pdf"
            file={{
              url:
                "https://cors-anywhere.herokuapp.com/http://www.africau.edu/images/default/sample.pdf?fbclid=IwAR0q89FFuOH13trzKpQ8OSwOc_A0ANF0QKRwe7L4zrJfCKZi__F8UpgTCNQ",
            }}
          >
            <Page className="pdf_doc_container" pageNumber={1} />
          </Document>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CVCorrection;
