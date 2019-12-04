import React from "react";
import { Container, Button, Card, Form, ButtonToolbar } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";
import bgImage from "../../assets/fot..png";
import "./style.css";
import Col from "react-bootstrap/Col";

registerLocale("pl", polish);

class CVEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      birthDate: new Date(),
      phoneNumber: "",
      email: "",

      education: [],
      workExperience: [],
      itemObj: {},
      itemDescription: "",
      itemStartTime: new Date(),
      itemEndTime: "",

      skills: [],
      skillToAdd: "",

      languages: {},
      languageName: "",
      languageLevel: "podstawowy"
    };
  }

  handleBlur = (e, val) => {
    this.setState({
      [val]: e.target.value
    });
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

    let correctName = /^([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,})$/.test(name);
    
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
    let correctName = /^([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{1,} )$/.test(name);

    if (correctName && this.state.skills.indexOf(this.state.skillToAdd) === -1) {
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
  }

  renderLanguages() {
    let languagesArr = [];
    for(var prop in this.state.languages) {
      let lanId = prop;
      let lanStr = "" + prop + " - " + this.state.languages[prop];
      languagesArr.push([lanId, lanStr]);
    }
    return (
      <ul>
        {languagesArr.map(language => (
          <Button id={language[0]} onClick={e => this.handleCutLanguage(e)}>
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
          <Button id={skill} onClick={e => this.handleCutSkill(e)}>
            {skill} x
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
          <Card.Header id="cv_page__title" as="h1">
            Kreator CV
          </Card.Header>
          <Card.Body>
            <Form id="cv_data" onSubmit={e => this.handleSubmit(e)}>
              <Form.Label>
                <h3>Dane osobowe</h3>
              </Form.Label>
              <Form.Group controlId="personalData">
                <Col>
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
                </Col>
              </Form.Group>
              <Form.Group id="complex-cv-fields">
                <Form.Label>
                  <h3>Edukacja</h3>
                </Form.Label>
                <br />
                <Col>
                  <Form.Control
                    type="textarea"
                    defaultValue={this.state.education}
                    placeholder="edukacja"
                    onBlur={e => this.handleBlur(e, "education")}
                    className="cv_page_input"
                  />
                </Col>
              </Form.Group>
              <Form.Group id="complex-cv-fields">
                <Form.Label>
                  <h3>Doświadczenie zawodowe</h3>
                </Form.Label>
                <Col>
                  <Form.Control
                    type="textarea"
                    defaultValue={this.state.workExperience}
                    placeholder="Doświadczenie"
                    onBlur={e => this.handleBlur(e, "workExperience")}
                    className="cv_page_input"
                  />
                </Col>
              </Form.Group>
              <Form.Group id="complex-cv-fields">
                <Form.Label>
                  <h3>Umiejętności</h3>
                </Form.Label>
                <Col>
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
                    onClick={e => {
                      this.handleSkillAdd(e);
                      console.log(this.state.skills);
                    }}
                  >
                    + Dodaj
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group id="complex-cv-fields">
                <Form.Label>
                  <h3>Języki obce</h3>
                </Form.Label>
                <Col>
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
                    onClick={language => this.handleAddLanguage(language)}
                  >
                    + Dodaj
                  </Button>
                </Col>
              </Form.Group>
              <ButtonToolbar id="cv_mgmt_button_toolbar">
                <Button variant="success" type="submit" id="saveButton">
                  Generuj CV
                </Button>
                <Button
                  variant="danger"
                  type="reset"
                  id="discardButton"
                  href="/user"
                >
                  Odrzuć
                </Button>
              </ButtonToolbar>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default CVEditorPage;
