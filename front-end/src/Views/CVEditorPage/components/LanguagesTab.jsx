import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import movie_5 from "../../../assets/movie_5.png";
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


    handleNameChange = (e) => {
        const name = e.target.value;

        this.setState(prevState => ({
            newLanguage: { ...prevState.newLanguage, name }
        }));
    }

    handleLevelChange = async (e) => {
        const level = await e.target.value;

        this.setState(prevState => ({
            newLanguage: { ...prevState.newLanguage, level }
        }));
    };

    render() {
        const levels = ['podstawowy', 'komunikatywny', 'biegły'];
        return (
            <CVEditorTab
                title="Języki obce"
                movie={movie_5}
                onPrevClick={this.props.onPrevClick}
                onNextClick={this.props.onNextClick}
                comments={this.props.comments}
            >
                <ItemsList
                    getItemId={this.getLanguageId} getItemName={this.getLanguageName} getItem={this.getLanguage}
                    data={this.props.data} onChange={this.props.onChange}
                >
                    <Row>
                        <Form.Group as={Col} controlId="">
                            <Form.Label>Język</Form.Label>
                            <Form.Control
                                id="languageName"
                                type="text"
                                placeholder="Język"
                                value={this.state.newLanguage.name}
                                onChange={this.handleNameChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label>Poziom</Form.Label>
                            <Form.Control
                                id="languageLevel"
                                as="Select"
                                onChange={this.handleLevelChange}
                                value={this.state.newLanguage.level}
                            >
                                {levels.map(lev => (<option value={lev}>{lev}</option>))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </ItemsList>
            </CVEditorTab>
        )
    }
}

export default LanguagesTab;
