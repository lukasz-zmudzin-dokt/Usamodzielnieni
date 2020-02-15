import React from 'react';
import {Button, Card, Col, Form, Nav, Row} from "react-bootstrap";
import file from './response1.pdf'
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

    handleDocumentLoad = ({ numPages }) => {
        this.setState({
            numPages
        });
    };

    showNextPage = () => {
      this.setState(state =>({
          documentCurrentPage: state.documentCurrentPage + 1
      }));
    };

    showPrevPage = () => {
        this.setState(state =>({
            documentCurrentPage: state.documentCurrentPage - 1
        }));
    };

    render() {
        let { personalDataComments, educationComments, experienceComments, skillComments, langComments, additionalComments, documentCurrentPage, documentPageNumber } = this.state;
        let { handleBlur, handleDocumentLoad, showNextPage, showPrevPage } = this;
        return(
            <Row className="correction_area">
                {/* zamknąć wszystko w kartę? dwie? */}
               <Col className="pdf_viewer">
                   <Nav className="pdf_viewer_nav">
                       <Button className="button_nav prev" onClick={showPrevPage}>{"\< "}Poprzednia</Button>
                       <Button className="button_nav next" onClick={showNextPage}>Następna{" \>"}</Button>
                   </Nav>
                   {/* tu będzie pdf https://stackoverflow.com/questions/2740297/display-adobe-pdf-inside-a-div */}
                   <div>
                       <Document file={file} onLoadSuccess={handleDocumentLoad}>
                           <Page className="pdf_doc_container" pageNumber={documentCurrentPage}/>
                       </Document>
                       <p> Strona {documentCurrentPage} z {documentPageNumber}</p>
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
                        </Card.Body>
                    </Card>
                    {console.log(this.state)}
                </Col>
            </Row>
        )
    }
}

export default CVCorrectionPage;