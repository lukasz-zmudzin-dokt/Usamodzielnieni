import React from "react";
import { Card, Container, Form, Tab, Tabs, Alert } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./CVEditorPage.css";
import {
    PersonalDataTab,
    EducationTab,
    WorkExperienceTab,
    LanguagesTab,
    SkillsTab,
    PhotoTab 
} from './components';
import { UserContext } from "context";

import { sendData } from "Views/CVEditorPage/functions/other.js";
import { createCVObject } from "Views/CVEditorPage/functions/createCVObject.js";


class CVEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formTab: "personalData",
            error: false,

            personalData: null,
            education: null,
            workExperience: null,
            skills: null,
            languages: null,
            photo: null
        };
        this.tabs = [];
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

    handleCVSubmit = async (e) => {
        e.preventDefault();
        const cv = createCVObject(
            this.state.personalData,
            this.state.education,
            this.state.workExperience,
            this.state.skills,
            this.state.languages
        )
        console.log(JSON.stringify(cv));
        try {
            await sendData(cv, this.state.photo, this.context.token);
        } catch (e) {
            this.setState({ error: true });
        }
    };

    getTabs() {
        return [
            {
                id: 'personalData',
                name: 'Dane osobowe',
                component: (
                    <PersonalDataTab
                        data={this.state.personalData} onChange={personalData => this.setState({ personalData })}
                        onNextClick={this.onNextClick} />
                )
            },
            {
                id: 'education',
                name: 'Edukacja',
                component: (
                    <EducationTab
                        data={this.state.education} onChange={education => this.setState({ education })}
                        onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} />
                )
            },
            {
                id: 'workExperience',
                name: 'Doświadczenie zawodowe',
                component: (
                    <WorkExperienceTab
                        data={this.state.workExperience} onChange={workExperience => this.setState({ workExperience })}
                        onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} />
                )
            },
            {
                id: 'skills',
                name: 'Umiejętności',
                component: (
                    <SkillsTab
                        data={this.state.skills} onChange={skills => this.setState({ skills })}
                        onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} />
                )
            },
            {
                id: 'languages',
                name: 'Języki obce',
                component: (
                    <LanguagesTab
                        data={this.state.languages} onChange={languages => this.setState({ languages })}
                        onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} />
                )
            },
            {
                id: 'photo',
                name: 'Zdjęcie',
                component: (
                    <PhotoTab
                        data={this.state.photo} onChange={photo => this.setState({ photo })}
                        onPrevClick={this.onPrevClick} />
                )
            }
        ]
    }
    
    render() {
        this.tabs = this.getTabs();

        return (
            <Container>
                <Card>
                    <Card.Header as="h2">Kreator CV</Card.Header>
                    <Card.Body>
                        <Form id="cv_data" onSubmit={this.handleCVSubmit}>
                            <Tabs 
                                transition={false}
                                activeKey={this.state.formTab}
                                onSelect={e => this.setState({ formTab: e })}
                                className="CVEditorPage_tabs" // https://github.com/react-bootstrap/react-bootstrap/issues/4771
                            >
                                {this.tabs.map(tab => (<Tab eventKey={tab.id} key={tab.id} title={tab.name}>{tab.component}</Tab>))}
                            </Tabs>
                        </Form>
                        { this.state.error && <Alert variant="danger">Wystąpił błąd podczas generowania CV.</Alert> }
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

CVEditorPage.contextType = UserContext;

export default CVEditorPage;