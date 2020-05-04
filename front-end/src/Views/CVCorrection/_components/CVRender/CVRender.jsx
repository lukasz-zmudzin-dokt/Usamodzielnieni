import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import proxy from "config/api";
import { Alert, Pagination, Row } from "react-bootstrap";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CVRender = ({ url }) => {
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const numberToArray = () => {
    const array = [];
    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }
    return array;
  };

  const mapItems = numberToArray().map((number) => (
    <Pagination.Item
      active={number === activePage}
      onClick={() => setActivePage(number)}
    >
      {number}
    </Pagination.Item>
  ));

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
        <Row className="justify-content-center align-items-end ml-0 mr-0 ">
          <Pagination className="mb-0 mt-3">
            <Pagination.First onClick={() => setActivePage(1)} />
            <Pagination.Prev
              disabled={activePage === 1}
              onClick={() => setActivePage(activePage - 1)}
            />
            {mapItems}
            <Pagination.Next
              disabled={pages === activePage}
              onClick={() => setActivePage(activePage + 1)}
            />
            <Pagination.Last onClick={() => setActivePage(pages)} />
          </Pagination>
        </Row>
      ) : null}
    </div>
  );
};

export default CVRender;
