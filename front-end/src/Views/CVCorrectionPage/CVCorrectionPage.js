import React from 'react';
import {Col, Form} from "react-bootstrap";

class CVCorrectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalDataComments: undefined,
            educationComments: undefined,
            experienceComments: undefined,
            skillComments: undefined,
            langComments: undefined,
            additionalComments: undefined
        }
    };

    handleBlur = (component, e, name) => {
        component.setState({
            [name]: e.target.value
        });
    };

    render() {
        let { personalDataComments, educationComments, experienceComments, skillComments, langComments, additionalComments } = this.state;
        let { handleBlur } = this;
        return(
            <div className="correction_area">
                {/* zamknąć wszystko w kartę? dwie? */}
               <Col>
                   {/* tu będzie pdf https://stackoverflow.com/questions/2740297/display-adobe-pdf-inside-a-div */}
               </Col>
                <Col>
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
                    {console.log(this.state)}
                </Col>
            </div>
        )
    }
}

export default CVCorrectionPage;