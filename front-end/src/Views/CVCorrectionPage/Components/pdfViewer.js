import React from "react";
import { showPrevPage, showNextPage } from "../functions/pdfService";
import { Document, Page, pdfjs } from 'react-pdf';
import {Button, Col, Nav} from "react-bootstrap";
import file from "../response1.pdf";
import "../style.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PDFViewer = ({ component }, loadSuccess) => {
    let { documentCurrentPage, numPages } = component.state;
    return (
        <Col className="pdf_viewer">
            <Nav className="pdf_viewer_nav">
                <Button className="button_nav prev" onClick={showPrevPage(component)}>{"\< "}Poprzednia</Button>
                {window.innerWidth >= 768 ? (<p className="nav_pagination"> Strona {documentCurrentPage} z {numPages}</p>) : ""}
                <Button className="button_nav next" onClick={showNextPage(component)}>Następna{" \>"}</Button>
            </Nav>
            <div>
                <Document className="pdf_doc" file={file} onLoadSuccess={loadSuccess}>
                    {console.log(component.state)}
                    <Page className="pdf_doc_container" pageNumber={documentCurrentPage} style={"width:100%;"}/>
                </Document>
            </div>
        </Col>
    );
};

export default PDFViewer;