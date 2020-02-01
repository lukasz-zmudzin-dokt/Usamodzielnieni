import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import movie_5 from "../../../assets/movie_5.png";
import Languages from 'Views/CVEditorPage/components/Languages';
import { handleAddLanguage, handleLanChange, handleLanLvlChange } from 'Views/CVEditorPage/functions/handlers.js';

class LanguagesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: {},
            languageName: "",
            languageLevel: "podstawowy"
        }
    }

    render() {
        return (
            <div>
                <Form.Group id="complex-cv-fields">
                    <Form.Label>
                        <h3>Języki obce</h3>
                        <br></br>
                        <img className="cv_section_img" src={movie_5} width="400vw" alt="" />
                    </Form.Label>
                    <Languages component={this} />
                    <Form.Control
                        className="cv_page_input"
                        id="languages"
                        type="text"
                        placeholder="Język"
                        value={this.state.languageName}
                        onChange={e => handleLanChange(this, e)}
                    />
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Poziom</Form.Label>
                        <Form.Control
                            className="cv_lang_lvl_selector"
                            as="Select"
                            onChange={e => handleLanLvlChange(this, e)}
                        //    value={this.state.languageLevel}
                        >
                            <option value="podstawowy">podstawowy</option>
                            <option value="komunikatywny">komunikatywny</option>
                            <option value="biegły">biegły</option>
                        </Form.Control>
                        <Button
                            variant="success"
                            onClick={language => handleAddLanguage(this, language)}
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
                        <Button className="form_navigation_next" disabled>Dalej →</Button>
                    </ButtonToolbar>

                    <ButtonToolbar id="cv_mgmt_button_toolbar">
                        <Button
                            className="btn_discard"
                            size="lg"
                            variant="danger"
                            type="reset"
                            id="discardButton"
                            href="/user"
                        >
                            Odrzuć
                    </Button>
                        <Button
                            className="btn_generate"
                            size="lg"
                            variant="success"
                            type="submit"
                            id="saveButton"
                        >
                            Generuj CV
                    </Button>
                    </ButtonToolbar>
                </Form.Group>
            </div>
        )
    }
}

export default LanguagesTab;
