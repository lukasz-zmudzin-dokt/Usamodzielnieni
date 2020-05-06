import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import proxy from "config/api";
import { Alert } from "react-bootstrap";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { PaginationCV } from "Views/CVCorrection/_components";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CVRender = ({ url }) => {
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="cvCorrection__pdfContainer">
      <Document
        className="CVCorrection__pdf"
        file={{
          url: `${proxy.plain}${url}`,
        }}
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
