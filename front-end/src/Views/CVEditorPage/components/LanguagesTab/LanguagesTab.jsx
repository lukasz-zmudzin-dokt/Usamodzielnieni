import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import movie_5 from "assets/movie_5.png";
import { CVEditorTab, ItemsList } from '..';

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

    getLanguage = () => this.state.newLanguage;
    getLanguageId = (lang) => `${lang.name}_${lang.level}`;
    getLanguageName = (lang) => `${lang.name} - ${lang.level}`;
    clear = () => this.setState({ newLanguage: { name: '', level: 'podstawowy' } });

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
                    data={this.props.data} onChange={this.props.onChange} clear={this.clear}
                >
                    <Row>
                        <Form.Group as={Col} xs={12} md={6} controlId="languageName">
                            <Form.Label>Język</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Język"
                                value={this.state.newLanguage.name}
                                onChange={this.handleNameChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="languageLevel">
                            <Form.Label>Poziom</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.handleLevelChange}
                                value={this.state.newLanguage.level}
                            >
                                {levels.map(lev => (<option key={lev} value={lev}>{lev}</option>))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </ItemsList>
            </CVEditorTab>
        )
    }
}

export default LanguagesTab;
