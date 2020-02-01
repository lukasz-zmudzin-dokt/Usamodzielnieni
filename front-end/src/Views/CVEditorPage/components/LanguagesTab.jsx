import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import movie_5 from "../../../assets/movie_5.png";
import { handleLanChange, handleLanLvlChange } from 'Views/CVEditorPage/functions/handlers.js';
import CVEditorTab from 'Views/CVEditorPage/components/CvEditorTab';
import ItemsList from 'Views/CVEditorPage/components/ItemsList';

class LanguagesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLanguage: {
                name: '',
                level: 'podstawowy'
            }
        }
    }

    getLanguage = () => {
        const lang = this.state.newLanguage;
        this.setState({
            newLanguage: { name: '', level: 'podstawowy' }
        });
        return lang;
    }
    getLanguageId = (lang) => `${lang.name}_${lang.level}`;
    getLanguageName = (lang) => `${lang.name} - ${lang.level}`;

    render() {
        const levels = ['podstawowy', 'komunikatywny', 'biegły'];
        return (
            <div>
                <CVEditorTab
                    title="Języki obce"
                    movie={movie_5}
                    onPrevClick={this.props.onPrevClick}
                >
                    <ItemsList getItemId={this.getLanguageId} getItemName={this.getLanguageName} getItem={this.getLanguage}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Język</Form.Label>
                            <Form.Control
                                className="cv_page_input"
                                id="languageName"
                                type="text"
                                placeholder="Język"
                                value={this.state.newLanguage.name}
                                onChange={e => handleLanChange(this, e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Poziom</Form.Label>
                            <Form.Control
                                id="languageLevel"
                                className="cv_lang_lvl_selector"
                                as="Select"
                                onChange={e => handleLanLvlChange(this, e)}
                                value={this.state.newLanguage.level}
                            >
                                {levels.map(lev => (<option value={lev}>{lev}</option>))}
                            </Form.Control>
                        </Form.Group>
                    </ItemsList>
                </CVEditorTab>
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
            </div>
        )
    }
}

export default LanguagesTab;
