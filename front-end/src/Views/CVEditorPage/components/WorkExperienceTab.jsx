import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import movie_3 from "../../../assets/movie_3.png";
import RenderForm from 'Views/CVEditorPage/components/RenderForm';

class WorkExperienceTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workExperience: {},
            workPlace: "",
            workDescription: "",
            workStartTime: new Date(),
            workEndTime: undefined
        }
    }

    render() {
        return (
            <div>
                <Form.Group id="complex-cv-fields">
                    <Form.Label>
                        <h3>Doświadczenie zawodowe</h3>
                        <br></br>
                        <img className="cv_section_img" src={movie_3} width="400vw" alt="" />
                    </Form.Label>
                    <RenderForm component={this} formName="workExperience" />
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

export default WorkExperienceTab;