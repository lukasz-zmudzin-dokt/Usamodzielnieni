import React from 'react';
import {Button, ButtonToolbar, Card, Col, Form, Nav} from "react-bootstrap";
import file from './response1.pdf'
import { LinkContainer } from 'react-router-bootstrap'
import { Document, Page, pdfjs } from 'react-pdf';
import './style.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class CVCorrectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalDataComments: undefined,
            educationComments: undefined,
            experienceComments: undefined,
            skillComments: undefined,
            langComments: undefined,
            additionalComments: undefined,

            documentCurrentPage: 1,
            numPages: 1
        }
    };

    handleBlur = (component, e, name) => {
        component.setState({
            [name]: e.target.value
        });
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({
            numPages
        });
    };

    showNextPage = () => {
        if (this.state.documentCurrentPage < this.state.numPages)
          this.setState(state =>({
              documentCurrentPage: state.documentCurrentPage + 1
          }));
    };

    showPrevPage = () => {
        if (this.state.documentCurrentPage > 1)
            this.setState(state =>({
                documentCurrentPage: state.documentCurrentPage - 1
            }));
    };

    sendReview = () => {
        console.log("czekamy na endpointa");
        console.log(this.state);
    };

    render() {
        let { personalDataComments, educationComments, experienceComments, skillComments, langComments, additionalComments, documentCurrentPage, numPages } = this.state;
        let { handleBlur, onDocumentLoadSuccess, showNextPage, showPrevPage, sendReview } = this;
        return(
            <div className="correction_area">
               <Col className="pdf_viewer">
                   <Nav className="pdf_viewer_nav">
                       <Button className="button_nav prev" onClick={showPrevPage}>{"\< "}Poprzednia</Button>
                       {window.innerWidth >= 768 ? (<p className="nav_pagination"> Strona {documentCurrentPage} z {numPages}</p>) : ""}

                       <Button className="button_nav next" onClick={showNextPage}>Następna{" \>"}</Button>
                   </Nav>
                   <div>
                       <Document className="pdf_doc" file={file} onLoadSuccess={onDocumentLoadSuccess}>
                           <Page className="pdf_doc_container" pageNumber={documentCurrentPage} style={"width:100%;"}/>
                       </Document>
                   </div>
               </Col>
                <Col className="cv_comment_area">
                    <Card>
                        <Card.Header className="comment_card_title" as="h2">
                            Uwagi do CV
                        </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="correctionData">
                                <Form.Label>
                                    <h3 className="correction_title">Dane osobowe</h3>
                                </Form.Label>
                                <Form.Control
                                    inline
                                    as="textarea"
                                    rows="3"
                                    placeholder="Wpisz uwagi..."
                                    defaultValue={personalDataComments}
                                    onBlur={e => handleBlur(this, e, "personalDataComments")}
                                    className="cv_correction_textarea personal"
                                />
                                <Form.Label>
                                    <h3 className="correction_title">Edukacja</h3>
                                </Form.Label>
                                <Form.Control
                                    inline
                                    as="textarea"
                                    rows="3"
                                    placeholder="Wpisz uwagi..."
                                    defaultValue={educationComments}
                                    onBlur={e => handleBlur(this, e, "educationComments")}
                                    className="cv_correction_textarea education"
                                />
                                <Form.Label>
                                    <h3 className="correction_title">Doświadczenie zawodowe</h3>
                                </Form.Label>
                                <Form.Control
                                    inline
                                    as="textarea"
                                    rows="3"
                                    placeholder="Wpisz uwagi..."
                                    defaultValue={experienceComments}
                                    onBlur={e => handleBlur(this, e, "experienceComments")}
                                    className="cv_correction_textarea experience"
                                />
                                <Form.Label>
                                    <h3 className="correction_title">Umiejętności</h3>
                                </Form.Label>
                                <Form.Control
                                    inline
                                    as="textarea"
                                    rows="3"
                                    placeholder="Wpisz uwagi..."
                                    defaultValue={skillComments}
                                    onBlur={e => handleBlur(this, e, "skillComments")}
                                    className="cv_correction_textarea personal"
                                />
                                <Form.Label>
                                    <h3 className="correction_title">Języki obce</h3>
                                </Form.Label>
                                <Form.Control
                                    inline
                                    as="textarea"
                                    rows="3"
                                    placeholder="Wpisz uwagi..."
                                    defaultValue={langComments}
                                    onBlur={e => handleBlur(this, e, "langComments")}
                                    className="cv_correction_textarea languages"
                                />
                                <Form.Label>
                                    <h3 className="correction_title">Dodatkowe uwagi</h3>
                                </Form.Label>
                                <Form.Control
                                    inline
                                    as="textarea"
                                    rows="3"
                                    placeholder="Wpisz uwagi..."
                                    defaultValue={additionalComments}
                                    onBlur={e => handleBlur(this, e, "additionalComments")}
                                    className="cv_correction_textarea additional"
                                />
                            </Form.Group>
                            <ButtonToolbar className="comment_mgmt_toolbar">
                                <Button className="comment_button send" variant="success" onClick={sendReview}>Wyślij uwagi</Button>
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