import React from "react";
import {
  Button,
  ButtonToolbar,
  Card,
  Container,
  Form,
  Tab,
  Tabs
} from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";
import bgImage from "../../assets/fot..png";
import "./style.css";
import Col from "react-bootstrap/Col";
import Film from "../graphics/movie.png";

registerLocale("pl", polish);

class CVEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      birthDate: new Date(),
      phoneNumber: "",
      email: "",

      education: {},
      eduPlace: "",
      eduDescription: "",
      eduStartTime: new Date(),
      eduEndTime: undefined,

      workExperience: {},
      workPlace: "",
      workDescription: "",
      workStartTime: new Date(),
      workEndTime: undefined,

      skills: [],
      skillToAdd: "",

      languages: {},
      languageName: "",
      languageLevel: "podstawowy"
    };
  }

  sendData = (e, object) => {
    const url = "https://usamo-back.herokuapp.com/cv/generate/";
    console.log(this.props.token);
    console.log(JSON.stringify(object));
    const response = fetch(url, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        Authorization: "Token 823a5c3a7a62c657231c4f99176317ac0a0454b6",
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      responseType: "blob"
    }).then(res => {
      if (res.status === 200) {
        console.log(res);
        const file = new Blob([res.data], { type: "application/pdf" });
        let fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // res.json().then(responseValue => {
        //     responseValue.setContentType("application/pdf");
        //     console.log(responseValue);
        //     responseValue.name = "cv.pdf";
        //     let fileURL = URL.createObjectURL(responseValue);
        //     window.open(fileURL, "EPrescription");
        // });
      }
    });
  };

  createCVObject(e) {
    e.preventDefault();
    const {
      fullName,
      birthDate,
      phoneNumber,
      email,
      education,
      workExperience,
      skills,
      languages
    } = this.state;
    let name = fullName.split(" ");
    let edItemList = [];
    let workItemList = [];
    let langList = [];
    let eduNames = Object.keys(education);
    let workNames = Object.keys(workExperience);
    let langNames = Object.keys(languages);
    for (let index in eduNames) {
      let prop = eduNames[index];
      console.log(prop);
      console.log(education[prop]);
      if (education[prop][1] === undefined)
        edItemList.push({
          name: prop,
          year_start: education[prop][0].getFullYear(),
          year_end: education[prop][1],
          additional_info: education[prop][2]
        });
      else
        edItemList.push({
          name: prop,
          year_start: education[prop][0].getFullYear(),
          year_end: education[prop][1].getFullYear(),
          additional_info: education[prop][2]
        });
    }

    for (let index in workNames) {
      let prop = workNames[index];
      if (workExperience[prop][1] === undefined)
        workItemList.push({
          name: prop,
          year_start: workExperience[prop][0].getFullYear(),
          year_end: workExperience[prop][1],
          additional_info: workExperience[prop][2]
        });
      else
        workItemList.push({
          name: prop,
          year_start: workExperience[prop][0].getFullYear(),
          year_end: workExperience[prop][1].getFullYear(),
          additional_info: workExperience[prop][2]
        });
    }

    for (let index in langNames) {
      let prop = langNames[index];
      langList.push({
        name: prop,
        level: languages[prop]
      });
    }

    return {
      basic_info: {
        first_name: name[0],
        last_name: name[1],
        date_of_birth:
          birthDate.getDay() +
          "-" +
          birthDate.getMonth() +
          "-" +
          birthDate.getFullYear(),
        phone_number: phoneNumber,
        email: email
      },
      schools: edItemList.map(school => {
        return {
          name: school.name,
          year_start: school.year_start,
          year_end: school.year_end,
          additional_info: school.additional_info
        };
      }),
      experiences: workItemList.map(workPlace => {
        return {
          title: workPlace.name,
          year_start: workPlace.year_start,
          year_end: workPlace.year_end,
          description: workPlace.additional_info
        };
      }),
      skills: skills.map(skill => {
        return {
          description: skill
        };
      }),
      languages: langList.map(lang => {
        return {
          name: lang.name,
          level: lang.level
        };
      })
    };
  }

  addComplexItem = (e, arrayName) => {
    e.preventDefault();
    let array, itemDescription, itemStartTime, itemEndTime, itemPlace;
    if (arrayName === "education") {
      array = this.state.education;
      itemDescription = this.state.eduDescription;
      itemStartTime = this.state.eduStartTime;
      itemEndTime = this.state.eduEndTime;
      itemPlace = this.state.eduPlace;
    } else {
      array = this.state.workExperience;
      itemDescription = this.state.workDescription;
      itemStartTime = this.state.workStartTime;
      itemEndTime = this.state.workEndTime;
      itemPlace = this.state.workPlace;
    }

    let descrStr =
      arrayName === "education" ? "eduDescription" : "workDescription";
    let startStr = arrayName === "education" ? "eduStartTime" : "workStartTime";
    let endStr = arrayName === "education" ? "eduEndTime" : "workEndTime";
    let placeStr = arrayName === "education" ? "eduPlace" : "workPlace";

    let newItemList = array;
    let newItemProps = [itemStartTime, itemEndTime, itemPlace];

    if (itemDescription !== "") {
      newItemList[itemDescription] = newItemProps;
    }

    this.setState({
      [arrayName]: newItemList,
      [descrStr]: "",
      [startStr]: new Date(),
      [endStr]: undefined,
      [placeStr]: undefined
    });

    for (let prop in this.state.education) {
      console.log(this.complexItemToStr(prop, this.state.education[prop]));
    }

    console.log(this.state.workExperience);
  };

  handleDateChange = (dateFieldName, date) => {
    this.setState({
      [dateFieldName]: date
    });
  };

  handleBlur = (e, val) => {
    this.setState({
      [val]: e.target.value
    });
  };

  handleCVSubmit = e => {
    console.log(this.state);
    this.sendData(e, this.createCVObject(e));
    e.preventDefault();
  };

  handleBirthDateChange = date => {
    this.setState({
      birthDate: date
    });
  };

  handleAddLanguage = e => {
    let newLanguages = this.state.languages;
    let name = this.state.languageName;
    let level = this.state.languageLevel;

    let correctName = name !== "";

    if (correctName) {
      newLanguages[name] = level;
      this.setState({
        languages: newLanguages
      });

      this.setState({
        languageName: ""
      });
    }

    console.log(this.state.languages);
  };

  handleLanChange = e => {
    this.setState({
      languageName: e.target.value
    });
  };

  handleLanLvlChange = async e => {
    var value = await e.target.value;

    this.setState({ languageLevel: value });
  };

  handleSkillAdd = e => {
    let newSkills = this.state.skills;
    let name = this.state.skillToAdd;
    let correctName = name !== "";

    if (
      correctName &&
      this.state.skills.indexOf(this.state.skillToAdd) === -1
    ) {
      newSkills.push(name);

      this.setState({
        skills: newSkills
      });

      this.setState({
        skillToAdd: ""
      });
    }
  };

  handleCutSkill = e => {
    let items = this.state.skills;
    let index = this.state.skills.indexOf(e.target.id);

    if (index !== -1) {
      items.splice(index, 1);
      this.setState({
        skills: items
      });
    }
  };

  handleCutLanguage = e => {
    let newLanguages = this.state.languages;
    let toDelete = e.target.id;

    delete newLanguages[toDelete];

    this.setState({
      languages: newLanguages
    });
  };

  handleCutEdu = e => {
    let newEducation = this.state.education;
    let toDelete = e.target.id;

    delete newEducation[toDelete];

    this.setState({
      education: newEducation
    });
  };

  handleCutWork = e => {
    let newEducation = this.state.workExperience;
    let toDelete = e.target.id;

    delete newEducation[toDelete];

    this.setState({
      workExperience: newEducation
    });
  };

  complexItemToStr(key, dates) {
    //console.log(key);
    //console.log(dates);
    let toReturn = "" + key;
    let start = dates[0];
    let end = dates[1];
    let month = start.getMonth() + 1;
    let year = start.getYear() + 1900;

    toReturn += (month < 10 ? "\nod: 0" : "\nod: ") + month + "/" + year;

    if (end === undefined) {
      toReturn += "\ndo: teraz";
    } else {
      month = end.getMonth() + 1;
      year = end.getYear() + 1900;
      toReturn += (month < 10 ? "\ndo: 0" : "\ndo: ") + month + "/" + year;
    }
    toReturn += " (" + dates[2] + ")";
    return toReturn;
  }

  renderLanguages() {
    let languagesArr = [];
    for (var prop in this.state.languages) {
      let lanId = prop;
      let lanStr = "" + prop + " - " + this.state.languages[prop];
      languagesArr.push([lanId, lanStr]);
    }
    return (
      <ul>
        {languagesArr.map(language => (
          <Button
            variant="dark"
            id={language[0]}
            onClick={e => this.handleCutLanguage(e)}
          >
            {language[1]} x
          </Button>
        ))}
      </ul>
    );
  }

  renderSkills() {
    if (this.state.skills.length === 0) return;
    return (
      <ul>
        {this.state.skills.map(skill => (
          <Button
            variant="dark"
            id={skill}
            onClick={e => this.handleCutSkill(e)}
          >
            {skill} x
          </Button>
        ))}
      </ul>
    );
  }

  renderItems(formName) {
    if (formName === "education") return this.renderEdu();
    else return this.renderWork();
  }

  renderForm(formName) {
    let descriptionStr =
      formName === "education" ? "eduDescription" : "workDescription";
    let startTimeStr =
      formName === "education" ? "eduStartTime" : "workStartTime";
    let endTimeStr = formName === "education" ? "eduEndTime" : "workEndTime";
    let placeStr = formName === "education" ? "eduPlace" : "workPlace";

    return (
      <div id="complex_form_input_set">
        <Form.Group id="temp_data">
          {this.renderItems(formName)}
          <Form.Label column={""}>
            Od:<span>&nbsp;</span>
          </Form.Label>
          <DatePicker
            className="complex_form_input_item"
            locale="pl"
            dateFormat=" MM.yyyy"
            selected={
              formName === "education"
                ? this.state.eduStartTime
                : this.state.workStartTime
            }
            onChange={date => this.handleDateChange(startTimeStr, date)}
            showMonthYearPicker
          />
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Form.Label column={""}>
            Do:<span>&nbsp;</span>
          </Form.Label>
          <DatePicker
            className="complex_form_input_item"
            locale="pl"
            dateFormat=" MM.yyyy"
            selected={
              formName === "education"
                ? this.state.eduEndTime
                : this.state.workEndTime
            }
            onChange={date => this.handleDateChange(endTimeStr, date)}
            showMonthYearPicker
          />
          <br></br>
          <Form.Label column={""}>Miejsce:</Form.Label>
          <Form.Control
            className="complex_form_input_item"
            inline
            type="text"
            //defaultValue={this.state.fullName}
            placeholder="Nazwa szkoły/miejsca pracy"
            onBlur={e => this.handleBlur(e, placeStr)}
          />
          <Form.Label column={""}>Opis:</Form.Label>
          <Form.Control
            className="complex_form_input_item"
            inline
            type="text"
            //defaultValue={this.state.fullName}
            placeholder="Profil/stanowisko ..."
            onBlur={e => this.handleBlur(e, descriptionStr)}
          />
        </Form.Group>
        <Button
          id="item_add_button"
          variant="secondary"
          type="submit"
          onClick={e => this.addComplexItem(e, formName)}
        >
          + Dodaj
        </Button>
      </div>
    );
  }

  renderEdu() {
    let eduArr = [];
    for (let prop in this.state.education) {
      let eduId = prop;
      let eduStr = this.complexItemToStr(prop, this.state.education[prop]);
      eduArr.push([eduId, eduStr]);
    }
    return (
      <ul>
        {eduArr.map(edu => (
          <Button
            id={edu[0]}
            variant="dark"
            onClick={e => this.handleCutEdu(e)}
          >
            {edu[1]} x
          </Button>
        ))}
      </ul>
    );
  }

  renderWork() {
    let eduArr = [];
    for (let prop in this.state.workExperience) {
      let eduId = prop;
      let eduStr = this.complexItemToStr(prop, this.state.workExperience[prop]);
      eduArr.push([eduId, eduStr]);
    }
    return (
      <ul>
        {eduArr.map(edu => (
          <Button
            id={edu[0]}
            variant="dark"
            onClick={e => this.handleCutWork(e)}
          >
            {edu[1]} x
          </Button>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <Container className="CVEditorPage">
        {window.innerWidth >= 768 ? (
          <img className="cvPage__bgImage" src={bgImage} alt="tło" />
        ) : null}
        <Card className="CVEditorPage_card">
          <Card.Header className="cv_page_title" as="h2">
            Kreator CV
          </Card.Header>
          <Card.Body>
            <Form id="cv_data" onSubmit={e => this.handleCVSubmit(e)}>
              <Col>
                <Tabs defaultActiveKey="personalData" id="tabs">
                  <Tab eventKey="personalData" title="Dane osobowe">
                    <Form.Label>
                      <h3>Dane osobowe</h3>
                      <br></br>
                      <img src={Film} width="100px" alt="" />
                    </Form.Label>
                    <Form.Group controlId="personalData">
                      <Form.Label column={""} sm="2">
                        Imię i nazwisko:
                      </Form.Label>
                      <Form.Control
                        inline
                        type="text"
                        required
                        defaultValue={this.state.fullName}
                        placeholder="Jan Przykładowy"
                        onBlur={e => this.handleBlur(e, "fullName")}
                        className="cv_page_input"
                      />
                      <Form.Label column={""} sm="2">
                        Data urodzenia:{" "}
                      </Form.Label>
                      <DatePicker
                        className="cv_page_input"
                        locale="pl"
                        dateFormat=" dd.MM.yyyy"
                        selected={this.state.birthDate}
                        onChange={this.handleBirthDateChange}
                        withPortal
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                      <Form.Label column={""} sm="2">
                        Numer telefonu:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={this.state.phoneNumber}
                        placeholder="+48123456789"
                        onBlur={e => this.handleBlur(e, "phoneNumber")}
                        className="cv_page_input"
                      />
                      <Form.Label column={""} sm="2">
                        Adres email:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        required
                        defaultValue={this.state.email}
                        placeholder="example@domain.com"
                        onBlur={e => this.handleBlur(e, "email")}
                        className="cv_page_input"
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="education" title="Edukacja">
                    <Form.Group id="complex-cv-fields">
                      <Form.Label>
                        <h3>Edukacja</h3>
                        <br></br>
                        <img src={Film} width="100px" alt="" />
                      </Form.Label>
                      {this.renderForm("education")}
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="workExperience" title="Doświadczenie zawodowe">
                    <Form.Group id="complex-cv-fields">
                      <Form.Label>
                        <h3>Doświadczenie zawodowe</h3>
                        <br></br>
                        <img src={Film} width="100px" alt="" />
                      </Form.Label>
                      {this.renderForm("workExperience")}
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="skills" title="Umiejętności">
                    <Form.Group id="complex-cv-fields">
                      <Form.Label>
                        <h3>Umiejętności</h3>
                        <br></br>
                        <img src={Film} width="100px" alt="" />
                      </Form.Label>
                      {this.renderSkills()}
                      <Form.Control
                        className="cv_page_input"
                        type="text"
                        placeholder="Wpisz umiejętność"
                        value={this.state.skillToAdd}
                        onChange={e => {
                          this.setState({ skillToAdd: e.target.value });
                        }}
                      />
                      <Button
                        variant="secondary"
                        onClick={e => {
                          this.handleSkillAdd(e);
                          console.log(this.state.skills);
                        }}
                      >
                        + Dodaj
                      </Button>
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="languages" title="Języki obce">
                    <Form.Group id="complex-cv-fields">
                      <Form.Label>
                        <h3>Języki obce</h3>
                        <br></br>
                        <img src={Film} width="100px" alt="" />
                      </Form.Label>
                      {this.renderLanguages()}
                      <Form.Control
                        id="languages"
                        type="text"
                        placeholder="Język"
                        value={this.state.languageName}
                        onChange={e => this.handleLanChange(e)}
                      />
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Poziom</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={e => this.handleLanLvlChange(e)}
                          //    value={this.state.languageLevel}
                        >
                          <option value="podstawowy">podstawowy</option>
                          <option value="komunikatywny">komunikatywny</option>
                          <option value="biegły">biegły</option>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        variant="secondary"
                        onClick={language => this.handleAddLanguage(language)}
                      >
                        + Dodaj
                      </Button>
                    </Form.Group>
                  </Tab>
                </Tabs>
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
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default CVEditorPage;
