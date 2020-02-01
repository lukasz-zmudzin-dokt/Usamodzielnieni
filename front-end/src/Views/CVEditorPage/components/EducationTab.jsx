import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import movie_2 from "../../../assets/movie_2.png";
import RenderForm from 'Views/CVEditorPage/components/RenderForm';

class EducationTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            education: {},
            eduPlace: "",
            eduDescription: "",
            eduStartTime: new Date(),
            eduEndTime: undefined
        }
    }

    render() {
        return (
            <div>
                <Form.Group id="complex-cv-fields">
                    <Form.Label>
                        <h3>Edukacja</h3>
                        <br></br>
                        <img className="cv_section_img" src={movie_2} width="400vw" alt="" />
                    </Form.Label>
                    <RenderForm component={this} formName="education" />
                </Form.Group>
                <ButtonToolbar>
                    <Button
                        className="form_navigation_prev"
                        onClick={e => this.props.onPrevClick(e)}
                    >
                        ← Wstecz
                    </Button>
                    <Button
                        className="form_navigation_next"
                        onClick={e => this.props.onNextClick(e)}
                    >
                        Dalej →
                    </Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default EducationTab;