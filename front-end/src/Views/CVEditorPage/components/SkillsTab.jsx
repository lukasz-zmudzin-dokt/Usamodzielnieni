import React from "react";
import { Form } from "react-bootstrap";
import movie_4 from "../../../assets/movie_4.png";
import CVEditorTab from 'Views/CVEditorPage/components/CvEditorTab';
import ItemsList from 'Views/CVEditorPage/components/ItemsList';

class SkillsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSkill: {
                name: ''
            }
        }
    }

    getSkill = () => {
        const skill = this.state.newSkill;
        this.setState({
            newSkill: { name: '' }
        });
        return skill;
    }
    getSkillId = (skill) => skill.name;
    getSkillName = (skill) => skill.name;

    onNameChange = (e) => this.setState(prevState => ({
        newSkill: { ...prevState, name: e.target.value }
    }))

    render() {
        return (
            <CVEditorTab
                title="Umiejętności"
                movie={movie_4}
                onPrevClick={this.props.onPrevClick}
                onNextClick={this.props.onNextClick}
            >
                <ItemsList getItemId={this.getSkillId} getItemName={this.getSkillName} getItem={this.getSkill}>
                    <Form.Group controlId="">
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
