import React from "react";
import { Card, Container, Tab, Tabs, Alert } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
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
      error: false,
      tabs: {
        personalData: { data: null, refValue: React.createRef(), comments: undefined },
        education: { data: null, refValue: React.createRef(), comments: undefined },
        workExperience: { data: null, refValue: React.createRef(), comments: undefined },
        skills: { data: null, refValue: React.createRef(), comments: undefined },
        languages: { data: null, refValue: React.createRef(), comments: undefined },
        photo: { data: null, refValue: React.createRef(), comments: undefined },
      },
      loading: false,
      commentsError: false,
      showComments: true,
      disabled: false,
      validated: false
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

  checkValidity = () => {
    if (this.state.data.personalData) {

    }
  }

  handleCVSubmit = async e => {
    this.setState({ disabled: true });
    e.preventDefault();
    const validity = this.checkValidity();
    if (validity) {
      e.stopPropagation();
      this.setState({ disabled: false, validated: validity });
    } else {
      const cv = createCVObject(
        this.state.tabs.personalData.data,
        this.state.tabs.education.data,
        this.state.tabs.workExperience.data,
        this.state.tabs.skills.data,
        this.state.tabs.languages.data
      );
      console.log(JSON.stringify(cv));
      try {
        await sendData(cv, this.state.tabs.photo.data, this.context.token).then(() =>
          this.setState({ disabled: false })
        );
      } catch (e) {
        this.setState({ error: true, disabled: false });
      }
    }
  };

  getTabs = () => {
    const getTabProps = key => ({
      ...this.state.tabs[key],
      onChange: data => this.setState(prevState => ({ 
        tabs: { ...prevState.tabs, [key]: { ...prevState.tabs[key], data } }
      })),
      onPrevClick: this.onPrevClick,
      onNextClick: this.onNextClick,
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
            onSubmit={this.handleCVSubmit}
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
          const setTabComments = (key, comments) => {
            this.setState(prevState => ({
              tabs: {
                ...prevState.tabs,
                [key]: { ...prevState.tabs[key], comments }
              }
            }))
          }
          setTabComments('personalData', res.basic_info);
          setTabComments('education', res.schools);
          setTabComments('workExperience', res.experiences);
          setTabComments('skills', res.skills);
          setTabComments('languages', res.languages);
          setTabComments('photo', res.additional_info);
          this.setState({
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
            {this.state.error && (
              <Alert className="mt-3" variant="danger">
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
