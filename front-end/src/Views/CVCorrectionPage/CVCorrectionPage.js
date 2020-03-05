import React from 'react';
import {Button, ButtonToolbar, Card, Col, Form, Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Document, Page, pdfjs } from 'react-pdf';
import './style.css'
import { sendReview } from "./functions/apiConnection";
import RenderForms from "./Components/correctionForms";
import PDFViewer from "./Components/pdfViewer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class CVCorrectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basic_info: "",
            schools: "",
            experiences: "",
            skills: "",
            languages: "",
            additional: "",

            documentCurrentPage: 1,
            numPages: 1
        }
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({
            numPages: numPages+1
        });
    };

    render() {
        return(
            <div className="correction_area">
                <PDFViewer component={this}/>
                <Col className="cv_comment_area">
                    <Card>
                        <Card.Header className="comment_card_title" as="h2">
                            Uwagi do CV
                        </Card.Header>
                        <Card.Body>
                            <RenderForms component={this} loadSuccess={this.onDocumentLoadSuccess}/>
                            <ButtonToolbar className="comment_mgmt_toolbar">
                                <Button className="comment_button send" variant="success" onClick={sendReview(this)}>Wyślij uwagi</Button>
                                <LinkContainer to="/user">
                                    <Button className="comment_button cancel" variant="danger">Odrzuć</Button>
                                </LinkContainer>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                    {console.log(this.state)}
                </Col>
            </div>
        )
    }
}

export default CVCorrectionPage;