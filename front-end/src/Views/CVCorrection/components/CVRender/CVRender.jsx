import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CVRender = ({ width }) => {
  return (
    <div className="cvCorrection__pdfContainer">
      <Document
        className="CVCorrection__pdf"
        file={{
          url:
            "https://cors-anywhere.herokuapp.com/http://www.africau.edu/images/default/sample.pdf?fbclid=IwAR0q89FFuOH13trzKpQ8OSwOc_A0ANF0QKRwe7L4zrJfCKZi__F8UpgTCNQ",
        }}
      >
        <Page
          className="pdf_doc_container"
          size="A4"
          pageNumber={1}
          width={width}
        />
      </Document>
    </div>
  );
};

export default CVRender;
