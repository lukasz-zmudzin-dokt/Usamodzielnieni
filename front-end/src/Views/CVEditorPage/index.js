import React from "react";
import { Container, Button, ButtonGroup, Card, Form, ButtonToolbar, ToggleButton } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";
import bgImage from "../../assets/fot..png";
import "./style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoginPage from "../LoginPage";
import Film from "../graphics/filmik.PNG";

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
      languageLevel: "podstawowy",

      cvStyle: 0
    };
  }

  sendData = object => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://usamo-back.herokuapp.com/cv/generate/";
    const response = fetch(proxyurl + url, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        Authorization: "Token " + LoginPage.state.token,
        "Content-Type": "application/json"
      }
    });
  };

  createCVObject() {
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
    for (let prop in education) {
      if (education.hasOwnProperty(prop)) {
        if (prop[2] === undefined)
          edItemList.push(
            new Object({
              name: prop[0],
              year_start: prop[1].getFullYear,
              year_end: prop[2],
              additional_info: prop[3]
            })
          );
        else
          edItemList.push(
            new Object({
              name: prop[0],
              year_start: prop[1].getFullYear,
              year_end: prop[2].getFullYear,
              additional_info: prop[3]
            })
          );
      }
    }

    for (let prop in workExperience) {
      if (workExperience.hasOwnProperty(prop)) {
        if (prop[2] === undefined)
          workItemList.push(
            new Object({
              name: prop[0],
              year_start: prop[1].getFullYear,
              year_end: prop[2],
              additional_info: prop[3]
            })
          );
        else
          workItemList.push(
            new Object({
              name: prop[0],
              year_start: prop[1].getFullYear,
              year_end: prop[2].getFullYear,
              additional_info: prop[3]
            })
          );
      }
    }

    for (let prop in languages)
      if (languages.hasOwnProperty(prop)) {
        langList.push(lang => {
          return {
            name: prop[0],
            level: prop[1]
          };
        });
      }

    let obj = new Object({
      basic_info: {
        first_name: name[0],
        last_name: name[1],
        date_of_birth:
          birthDate.getDay +
          "-" +
          birthDate.getMonth +
          "-" +
          birthDate.getFullYear,
        phone_number: phoneNumber,
        email: email,
        schools: edItemList.map(school => {
          return {
            name: school.name,
            year_start: school.year_start,
            year_end: school.year_end,
            additional_info: school.additional_info
          };
        })
      },
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
    });
    return obj;
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
    this.sendData(this.createCVObject());
    e.preventDefault();
  };

  handleSubmit = (e, language) => {
    console.log(language.state);
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

    toReturn += "\nod: " + month + "/" + year;

    if (end === undefined) {
      toReturn += "\ndo: teraz";
    } else {
      month = end.getMonth() + 1;
      year = end.getYear() + 1900;
      toReturn += "\ndo: " + month + "/" + year;
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
          <Form.Label column={""}>Od:</Form.Label>
          <DatePicker
            className="complex_form_input_item"
            locale="pl"
            dateFormat=" MM.yyyy"
            selected={this.state.eduStartTime} //ogl
            onChange={date => this.handleDateChange(startTimeStr, date)}
            showMonthYearPicker
          />
          <Form.Label column={""}>Do:</Form.Label>
          <DatePicker
            className="complex_form_input_item"
            locale="pl"
            dateFormat=" MM.yyyy"
            selected={this.state.eduEndTime} //ogl
            onChange={date => this.handleDateChange(endTimeStr, date)}
            showMonthYearPicker
          />
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
          <Card.Header id="cv_page__title" as="h2">
            Kreator CV
          </Card.Header>
          <Card.Body>
            <Form id="cv_data" onSubmit={e => this.handleCVSubmit(e)}>
              <Col>
                <Form.Label>
                  <h3>Dane osobowe</h3>
                </Form.Label>
                <br></br>
                <img src={Film} alt="" width="100px" />
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

                <Form.Group id="complex-cv-fields">
                  <Form.Label>
                    <h3>Edukacja</h3>
                  </Form.Label>
                  <br></br>
                  <img src={Film} alt="" width="100px" />
                  {this.renderForm("education")}
                </Form.Group>

                <Form.Group id="complex-cv-fields">
                  <Form.Label>
                    <h3>Doświadczenie zawodowe</h3>
                  </Form.Label>
                  <br></br>
                  <img src={Film} alt="" width="100px" />
                  {this.renderForm("workExperience")}
                </Form.Group>

                <Form.Group id="complex-cv-fields">
                  <Form.Label>
                    <h3>Umiejętności</h3>
                  </Form.Label>
                  <br></br>
                  <img src={Film} alt="" width="100px" />
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

                <Form.Group id="complex-cv-fields">
                  <Form.Label>
                    <h3>Języki obce</h3>
                  </Form.Label>
                  <br></br>
                  <img src={Film} alt="" width="100px" />
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
                
                <Form.Group>
                    
                    <Form.Label><h3>Styl CV</h3></Form.Label>
                    <Row>
                    <Form.Check
                        type="radio"
                        id="pattern0"
                        label={<img src={Film} alt="" width="100px" />}
                        checked={this.state.cvStyle === 0}
                        onClick={e => this.setState({cvStyle: 0})}
                    />
                    <Form.Check
                        type="radio"
                        id="pattern1"
                        label={<img src={Film} alt="" width="100px" />}
                        checked={this.state.cvStyle === 1}
                        onClick={e => this.setState({cvStyle: 1})}
                    />
                    </Row>

                </Form.Group>
                
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
