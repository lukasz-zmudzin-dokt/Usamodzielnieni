import React, { useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import proxy from "config/api";
import { Alert, Row } from "react-bootstrap";
import { PaginationCV } from "Views/CVCorrection/_components";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const CVRender = ({ url }) => {
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const file = useMemo(() => ({ url: `${proxy.plain}${url}` }), [url]);

  return url && (
    <div className="cvCorrection__pdfContainer">
      <Document
        className="CVCorrection__pdf"
        file={file}
        error={<Alert variant="danger">Nie udało się załadować CV.</Alert>}
        loading={<Alert variant="info">Ładowanie...</Alert>}
        onLoadSuccess={(pdf) => setPages(pdf.numPages)}
      >
        <Page
          className="pdf_doc_container"
          size="A4"
          pageNumber={activePage}
          data-testid="pdf"
        />
      </Document>
      {url !== "" ? (
        <Row className="m-0 justify-content-center">
          <a
            href={`${proxy.plain}${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lub pobierz CV z tego linku
          </a>
        </Row>
      ) : null}
      {pages !== 1 ? (
        <PaginationCV
          pages={pages}
          setActivePage={(page) => setActivePage(page)}
          activePage={activePage}
        />
      ) : null}
    </div>
  );
};

export default CVRender;
