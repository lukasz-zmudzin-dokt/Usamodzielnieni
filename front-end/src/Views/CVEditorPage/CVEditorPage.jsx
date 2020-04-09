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
} from "./components";
import { UserContext } from "context";

import { sendData, getFeedback } from "Views/CVEditorPage/functions/other.js";
import { createCVObject } from "Views/CVEditorPage/functions/createCVObject.js";
import { withRouter } from "react-router-dom";

class CVEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: "personalData",
      comments: {},
      error: false,

      personalData: null,
      education: null,
      workExperience: null,
      skills: null,
      languages: null,
      photo: null,
      loading: false,
      commentsError: false,
      showComments: true,
      disabled: false
    };
    this.tabs = [];
  }

  onPrevClick = () => {
    const { formTab } = this.state;
    const tabIndex = this.tabs.findIndex(tab => tab.id === formTab);
    this.setState({ formTab: this.tabs[tabIndex - 1].id });
  };

  onNextClick = () => {
    const { formTab } = this.state;
    const tabIndex = this.tabs.findIndex(tab => tab.id === formTab);
    this.setState({ formTab: this.tabs[tabIndex + 1].id });
  };

  handleCVSubmit = async e => {
    this.setState({ disabled: true });
    e.preventDefault();
    const cv = createCVObject(
      this.state.personalData,
      this.state.education,
      this.state.workExperience,
      this.state.skills,
      this.state.languages
    );
    console.log(JSON.stringify(cv));
    try {
      await sendData(cv, this.state.photo, this.context.token).then(() =>
        this.setState({ disabled: false })
      );
    } catch (e) {
      this.setState({ error: true, disabled: false });
    }
  };

  getTabs = () => {
    const getTabProps = key => ({
      data: this.state[key],
      onChange: data => this.setState({ [key]: data }),
      onPrevClick: this.onPrevClick,
      onNextClick: this.onNextClick
    });
    return [
      {
        id: "personalData",
        name: "Dane osobowe",
        component: (
          <PersonalDataTab
            {...getTabProps("personalData")}
            onPrevClick={undefined}
          />
        )
      },
      {
        id: "education",
        name: "Edukacja",
        component: <EducationTab {...getTabProps("education")} />
      },
      {
        id: "workExperience",
        name: "Doświadczenie zawodowe",
        component: <WorkExperienceTab {...getTabProps("workExperience")} />
      },
      {
        id: "skills",
        name: "Umiejętności",
        component: <SkillsTab {...getTabProps("skills")} />
      },
      {
        id: "languages",
        name: "Języki obce",
        component: <LanguagesTab {...getTabProps("languages")} />
      },
      {
        id: "photo",
        name: "Zdjęcie",
        component: (
          <PhotoTab
            {...getTabProps("photo")}
            onNextClick={undefined}
            disabled={this.state.disabled}
          />
        )
      }
    ];
  };

  getTabs = () => {
    const getTabProps = key => ({
      data: this.state[key],
      onChange: data => this.setState({ [key]: data }),
      onPrevClick: this.onPrevClick,
      onNextClick: this.onNextClick,
      comments: this.state.comments[key],
      loading: this.state.loading,
      error: this.state.commentsError,
      showComments: this.state.showComments
    });
    return [
      {
        id: "personalData",
        name: "Dane osobowe",
        component: (
          <PersonalDataTab
            {...getTabProps("personalData")}
            onPrevClick={undefined}
          />
        )
      },
      {
        id: "education",
        name: "Edukacja",
        component: <EducationTab {...getTabProps("education")} />
      },
      {
        id: "workExperience",
        name: "Doświadczenie zawodowe",
        component: <WorkExperienceTab {...getTabProps("workExperience")} />
      },
      {
        id: "skills",
        name: "Umiejętności",
        component: <SkillsTab {...getTabProps("skills")} />
      },
      {
        id: "languages",
        name: "Języki obce",
        component: <LanguagesTab {...getTabProps("languages")} />
      },
      {
        id: "photo",
        name: "Zdjęcie",
        component: (
          <PhotoTab
            {...getTabProps("photo")}
            onNextClick={undefined}
            disabled={this.state.disabled}
          />
        )
      }
    ];
  };

  componentDidMount() {
    let cvId = this.props.match.params.id;
    if (cvId) {
      this.setState({ loading: true });
      getFeedback(this.context.token, this.props.match.params.id)
        .then(res => {
          this.setState({
            comments: {
              personalData: res.basic_info,
              education: res.schools,
              workExperience: res.experiences,
              skills: res.skills,
              languages: res.languages,
              photo: res.additional_info
            },
            loading: false,
            commentsError: false
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            commentsError: true
          });
        });
    } else {
      this.setState({ showComments: false });
    }
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
                {this.tabs.map(tab => (
                  <Tab eventKey={tab.id} key={tab.id} title={tab.name}>
                    {tab.component}
                  </Tab>
                ))}
              </Tabs>
            </Form>
            {this.state.error && (
              <Alert variant="danger">
                Wystąpił błąd podczas generowania CV.
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

CVEditorPage.contextType = UserContext;

export default withRouter(CVEditorPage);
