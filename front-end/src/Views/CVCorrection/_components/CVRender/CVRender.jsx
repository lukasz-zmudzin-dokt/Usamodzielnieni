import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import proxy from 'config/api';
import {Alert} from 'react-bootstrap'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CVRender = ({ url }) => {
  return (
    <div className="cvCorrection__pdfContainer">
      <Document
        className="CVCorrection__pdf"
        file={{
          url: `${proxy.plain}${url}`,
        }}
        error={<Alert variant="danger">Nie udało się załadować CV.</Alert>}
        loading={<Alert variant="info">Ładowanie...</Alert>}
      >
        <Page
          className="pdf_doc_container"
          size="A4"
          pageNumber={1}
          data-testid="pdf"
        />
      </Document>
    </div>
  );
};

export default CVRender;
