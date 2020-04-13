import React from "react";
import { Form } from "react-bootstrap";
import movie_4 from "assets/movie_4.png";
import { CVEditorTab, ItemsList } from '../';

class SkillsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSkill: {
                name: ''
            }
        }
    }

    getSkill = () => this.state.newSkill;
    getSkillId = (skill) => skill.name;
    getSkillName = (skill) => skill.name;
    clear = () => this.setState({ newSkill: { name: '' } });
    onNameChange = (e) => {
        const name = e.target.value;

        this.setState(prevState => ({
            newSkill: { ...prevState, name }
        }))
    }

    render() {
        return (
            <CVEditorTab
                title="Umiejętności"
                movie={movie_4}
                onPrevClick={this.props.onPrevClick}
                onNextClick={this.props.onNextClick}
                comments={this.props.comments}
                loading={this.props.loading}
                error={this.props.error}
                showComments={this.props.showComments}
            >
                <ItemsList
                    getItemId={this.getSkillId} getItemName={this.getSkillName} getItem={this.getSkill}
                    data={this.props.data} onChange={this.props.onChange} clear={this.clear} refValue={this.props.refValue}
                >
                    <Form.Group controlId="skillName">
                        <Form.Label>Umiejętność</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wpisz umiejętność"
                            value={this.state.newSkill.name}
                            onChange={this.onNameChange}
                        />
                    </Form.Group>
                </ItemsList>
            </CVEditorTab>
        )
    }
}

export default SkillsTab;
