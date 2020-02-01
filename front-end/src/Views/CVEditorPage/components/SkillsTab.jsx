import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import movie_4 from "../../../assets/movie_4.png";
import Skills from 'Views/CVEditorPage/components/Skills';
import { handleSkillAdd } from 'Views/CVEditorPage/functions/handlers.js';

class SkillsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            skillToAdd: ""
        }
    }

    render() {
        return (
            <div>
                <Form.Group id="complex-cv-fields">
                    <Form.Label>
                        <h3>Umiejętności</h3>
                        <br></br>
                        <img className="cv_section_img" src={movie_4} width="400vw" alt="" />
                    </Form.Label>
                    <Skills component={this} />
                    <Form.Control
                        className="cv_page_input"
                        type="text"
                        placeholder="Wpisz umiejętność"
                        value={this.state.skillToAdd}
                        onChange={e => {
                            this.setState({ skillToAdd: e.target.value });
                        }}
                    />
                    <Button
                        variant="success"
                        onClick={e => {
                            handleSkillAdd(this, e);
                            console.log(this.state.skills);
                        }}
                    >
                        + Dodaj
                    </Button>
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

export default SkillsTab;
