import React, { useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import proxy from "config/api";
import { Alert, Row } from "react-bootstrap";
import PaginationCV from "../PaginationCV";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const CVRender = ({ url, msg }) => {
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const file = useMemo(() => ({ url: `${proxy.plain}${url}` }), [url]);

  return msg ? (
    <div className="cvCorrection__pdfContainer">
      <Alert variant="danger" className="m-0">
        {msg}
      </Alert>
    </div>
  ) : url ? (
    <div className="cvCorrection__pdfContainer">
      <Document
        className="CVCorrection__pdf"
        file={file}
        error={
          <Alert variant="danger" className="m-0">
            Nie udało się załadować CV.
          </Alert>
        }
        loading={
          <Alert variant="info" className="m-0">
            Ładowanie...
          </Alert>
        }
        onLoadSuccess={(pdf) => setPages(pdf.numPages)}
      >
        <Page
          className="pdf_doc_container"
          size="A4"
          pageNumber={activePage}
          data-testid="pdf"
        />
      </Document>
      <Row className="mt-3 cvCorrection__pdfLink justify-content-center">
        <a
          href={`${proxy.plain}${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lub pobierz CV z tego linku
        </a>
      </Row>
      {pages !== 1 ? (
        <PaginationCV
          pages={pages}
          setActivePage={(page) => setActivePage(page)}
          activePage={activePage}
        />
      ) : null}
    </div>
  ) : (
    <div className="cvCorrection__pdfContainer"></div>
  );
};

export default CVRender;
