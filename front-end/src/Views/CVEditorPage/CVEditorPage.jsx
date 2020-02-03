import React from "react";
import { Card, Container, Form, Tab, Tabs } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./CVEditorPage.css";
import PersonalDataTab from 'Views/CVEditorPage/components/PersonalDataTab';
import EducationTab from 'Views/CVEditorPage/components/EducationTab';
import WorkExperienceTab from 'Views/CVEditorPage/components/WorkExperienceTab';
import LanguagesTab from 'Views/CVEditorPage/components/LanguagesTab';
import SkillsTab from 'Views/CVEditorPage/components/SkillsTab';
import { connect } from 'react-redux'

import { handleCVSubmit } from 'Views/CVEditorPage/functions/handlers.js';


class CVEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formTab: "personalData",
            token: this.props.token || undefined
        };
        this.tabs = [
            {
                id: 'personalData',
                name: 'Dane osobowe',
                component: ( <PersonalDataTab onNextClick={this.onNextClick} /> )
            },
            {
                id: 'education',
                name: 'Edukacja',
                component: ( <EducationTab onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} /> )
            },
            {
                id: 'workExperience',
                name: 'Doświadczenie zawodowe',
                component: ( <WorkExperienceTab onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} /> )
            },
            {
                id: 'skills',
                name: 'Umiejętności',
                component: ( <SkillsTab onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} /> )
            },
            {
                id: 'languages',
                name: 'Języki obce',
                component: ( <LanguagesTab onPrevClick={this.onPrevClick} /> )
            }
        ];
        
    }

    onPrevClick = () => {
        const { formTab } = this.state;
        const tabIndex = this.tabs.findIndex(tab => tab.id === formTab);
        if (tabIndex !== -1 && tabIndex > 0) {
            this.setState({ formTab: this.tabs[tabIndex - 1].id });
        }
    }

    onNextClick = () => {
        const { formTab } = this.state;
        const tabIndex = this.tabs.findIndex(tab => tab.id === formTab);
        if (tabIndex !== -1 && tabIndex < this.tabs.length - 1) {
            this.setState({ formTab: this.tabs[tabIndex + 1].id });
        }
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Header as="h2">Kreator CV</Card.Header>
                    <Card.Body>
                        <Form id="cv_data" onSubmit={e => handleCVSubmit(this, e)}>
                            <Tabs 
                                transition={false}
                                activeKey={this.state.formTab}
                                onSelect={e => this.setState({ formTab: e })}
                                className="CVEditorPage_tabs" // https://github.com/react-bootstrap/react-bootstrap/issues/4771
                            >
                                {this.tabs.map(tab => (<Tab eventKey={tab.id} title={tab.name}>{tab.component}</Tab>))}
                            </Tabs>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps:", state);
    const { token } = state.user;
    return { token };
};

export default connect(mapStateToProps)(CVEditorPage);