import React from "react";
import { Card, Container, Tab, Tabs } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {
  PersonalDataTab,
  EducationTab,
  WorkExperienceTab,
  LanguagesTab,
  SkillsTab,
  PhotoTab,
} from "./components";
import { UserContext } from "context";

import {
  sendData,
  getFeedback,
  getVideos,
} from "Views/CVEditorPage/functions/other.js";
import { createCVObject } from "Views/CVEditorPage/functions/createCVObject.js";
import { withRouter } from "react-router-dom";
import { fetchTemplateList, getCVdata } from "./functions/other";
import { mapData, mapFeedback } from "./functions/mapData";
import { withAlertContext } from "components";

class CVEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: "personalData",
      tabs: {
        personalData: {
          data: null,
          refValue: React.createRef(),
          comments: undefined,
        },
        education: { data: null, comments: undefined },
        workExperience: { data: null, comments: undefined },
        skills: { data: null, comments: undefined },
        languages: { data: null, comments: undefined },
        photo: { data: null, comments: undefined },
      },
      loading: false,
      commentsError: false,
      showComments: true,
      disabled: false,
      validated: false,
      fetchError: false,
      method: "POST",
      cv_id: undefined,
      has_photo: false,
<<<<<<< HEAD
      template: "bisque",
      templateList: [],
=======
      videos: { videos: [] },
      errVid: false,
>>>>>>> master
    };
    this.tabs = [];
  }

  onPrevClick = () => {
    const { formTab } = this.state;
    const tabIndex = this.tabs.findIndex((tab) => tab.id === formTab);
    this.setState({ formTab: this.tabs[tabIndex - 1].id });
  };

  onNextClick = () => {
    const { formTab } = this.state;
    const tabIndex = this.tabs.findIndex((tab) => tab.id === formTab);
    this.setState({ formTab: this.tabs[tabIndex + 1].id });
  };

  checkValidity = () => {
    const { tabs } = this.state;
    if (tabs.personalData.refValue.current.checkValidity() === false) {
      this.setState({ formTab: "personalData" });
      return false;
    }
    if (!tabs.education.data?.length) {
      this.setState({ formTab: "education" });
      return false;
    }
    if (!tabs.skills.data?.length) {
      this.setState({ formTab: "skills" });
      return false;
    }
    if (!tabs.languages.data?.length) {
      this.setState({ formTab: "languages" });
      return false;
    }
    return true;
  };

  handleCVSubmit = async (e) => {
    this.setState({ disabled: true, validated: true });
    e.preventDefault();
    const validity = this.checkValidity();
    if (!validity) {
      e.stopPropagation();
      this.setState({ disabled: false });
    } else {
      let cv = createCVObject(
        this.state.tabs.personalData.data,
        this.state.tabs.education.data,
        this.state.tabs.workExperience.data,
        this.state.tabs.skills.data,
        this.state.tabs.languages.data
      );
      cv = { ...cv, template: this.state.template };
      try {
        await sendData(
          cv,
          this.state.tabs.photo.data,
          this.context.token,
          this.state.method,
          this.state.cv_id
        ).then(() => this.setState({ disabled: false }));
      } catch (e) {
        this.setState({ disabled: false });
        this.props.alertContext.showAlert("Nie udało się wysłać CV");
      }
    }
  };

  getTabs = () => {
    const { videos, errVid } = this.state;
    const getTabProps = (key, id) => {
      if (videos.videos || errVid) {
        return {
          ...this.state.tabs[key],
          onChange: (data) =>
            this.setState((prevState) => ({
              tabs: {
                ...prevState.tabs,
                [key]: { ...prevState.tabs[key], data },
              },
            })),
          onPrevClick: this.onPrevClick,
          onNextClick: this.onNextClick,
          loading: this.state.loading,
          error: this.state.commentsError,
          showComments: this.state.showComments,
          validated: this.state.validated,
          isNew: this.state.method === "POST",
          video: videos.videos?.find((item) => item.id === id),
          errVid,
          formTab: { active: this.state.formTab, your: key },
        };
      }
    };
    return [
      {
        id: "personalData",
        name: "Dane osobowe",
        component: (
          <PersonalDataTab
            {...getTabProps("personalData", 1)}
            onPrevClick={undefined}
          />
        ),
      },
      {
        id: "education",
        name: "Edukacja",
        component: <EducationTab {...getTabProps("education", 2)} />,
      },
      {
        id: "workExperience",
        name: "Doświadczenie zawodowe",
        component: <WorkExperienceTab {...getTabProps("workExperience", 3)} />,
      },
      {
        id: "skills",
        name: "Umiejętności",
        component: <SkillsTab {...getTabProps("skills", 3)} />,
      },
      {
        id: "languages",
        name: "Języki obce",
        component: <LanguagesTab {...getTabProps("languages", 2)} />,
      },
      {
        id: "photo",
        name: "Zdjęcie",
        component: (
          <PhotoTab
            {...getTabProps("photo", 1)}
            onNextClick={undefined}
            onSubmit={this.handleCVSubmit}
            disabled={this.state.disabled}
            hasPhoto={this.state.has_photo}
<<<<<<< HEAD
            template={this.state.template}
            setTemplate={(t) => this.setState({ template: t })}
            templateList={this.state.templateList}
=======
            alertContext={this.props.alertContext}
>>>>>>> master
          />
        ),
      },
    ];
  };

  autofillEditor = async (id) => {
    let feedbackRes, cvRes, feedback, data;
    try {
      this.setState({
        loading: true,
        cv_id: id,
        method: "PUT",
      });
      cvRes = await getCVdata(this.context.token, id);
      if (cvRes.was_reviewed && !cvRes.is_verified) {
        try {
          feedbackRes = await getFeedback(this.context.token, id);
          feedback = mapFeedback(feedbackRes);
          Object.keys(feedback).forEach((item) => {
            this.setState((prevState) => ({
              tabs: {
                ...prevState.tabs,
                [item]: { ...prevState.tabs[item], comments: feedback[item] },
              },
            }));
          });
        } catch (e) {
          console.log(e);
          this.props.alertContext.showAlert("Nie udało się załadować uwag.");
        } finally {
          this.setState({
            loading: false,
          });
        }
      } else {
        this.setState({
          showComments: false,
        });
      }
      data = mapData(cvRes);
      Object.keys(data).forEach((item) => {
        this.setState((prevState) => ({
          tabs: {
            ...prevState.tabs,
            [item]: { ...prevState.tabs[item], data: data[item] },
          },
        }));
      });
      this.setState({
        template: cvRes.template,
        has_photo: cvRes.has_picture,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
      this.props.alertContext.showAlert("Nie udało się załadować CV.");
    }
  };

<<<<<<< HEAD
  getTemplates = async (token) => {
    let res;
    try {
      const { templates } = await fetchTemplateList(token);
      res = templates;
    } catch (e) {
      console.log(e);
      this.props.alertContext.showAlert(
        "Wystąpił błąd podczas pobierania wzorów CV."
      );
      res = [];
    }
    this.setState({
      templateList: res,
    });
=======
  getVideosData = async () => {
    try {
      const res = await getVideos(this.context.token, 1);
      this.setState({
        videos: res,
      });
    } catch (err) {
      this.setState({
        errVid: true,
      });
    }
>>>>>>> master
  };

  componentDidMount() {
    let cvId = this.props.match.params.id;
    this.getTemplates(this.context.token);
    if (cvId) {
      this.autofillEditor(cvId);
    } else {
      this.setState({ showComments: false });
    }
    this.getVideosData();
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
              onSelect={(e) => {
                this.setState({ formTab: e });
              }}
              className="CVEditorPage_tabs mb-1" // https://github.com/react-bootstrap/react-bootstrap/issues/4771
            >
              {this.tabs.map((tab) => (
                <Tab eventKey={tab.id} key={tab.id} title={tab.name}>
                  {tab.component}
                </Tab>
              ))}
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

CVEditorPage.contextType = UserContext;

export default withRouter(withAlertContext(CVEditorPage));
