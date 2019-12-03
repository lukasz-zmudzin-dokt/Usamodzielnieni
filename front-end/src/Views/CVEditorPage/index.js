import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";

import bgImage from "../../assets/fot..png";
import "./style.css";
import Form from "react-bootstrap/Form";
import Language from "./Language";
registerLocale("pl", polish);

class CVEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "", //czy w rejestracji będzie imię i nazwisko?
      birthDate: new Date(), //defaultowo formularz, potem może jakiś MonthPicker albo DatePicker
      phoneNumber: "",
      email: "", //import z db?
      education: [],
      educationObj: {},
      educationPlace: "",
      educationStart: "",
      educationFinish: "",
      workExperience: "",
      skills: [],
      skillToAdd: "",
      languages: [],
      languageToAdd: {},
      languageName: "",
      languageLevel: "podstawowy"
    };
  }

  handleBlur = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e, language) => {
    console.log(language.state);
    e.preventDefault();
  };

  handleDateChange = date => {
    this.setState({
      birthDate: date
    });
  };

  handleAddLanguage = language => {
    let languages = this.state.languages;
    languages += language;
    this.setState({
      languages: languages
    });
    language = new Language();
  };

  handleLanChange = (e, language) => {
    console.log(language.state);
    language.setName(e.target.value);
  };

  handleLanLvlChange = async e => {
    var value = await e.target.value;

    this.setState({ languageLevel: value });
    console.log(this.state.languageLevel);
  };

  handleSkillAdd = e => {
    let newSkills = this.state.skills;

    if (this.state.skillToAdd !== "" && 
        this.state.skills.indexOf(this.state.skillToAdd) === -1) {
      newSkills.push(this.state.skillToAdd);

      this.setState({
        skills: newSkills
      });

      this.setState({
        skillToAdd: ""
      });
    }
  };

  handleCutItem = e => {
    let items = this.state.skills;
    let index = this.state.skills.indexOf(e.target.id);

    if(index !== -1) {
      items.splice(index, 1);
      this.setState({
        skills: items
      });
    }
  }

  renderItems() {
    if(this.state.skills.length === 0) return;
    return <ul>{this.state.skills.map(
      skill => <Button
        id={skill}
        name="skills"
        onClick={e => this.handleCutItem(e)}
      >
        {skill} x
      </Button>)}</ul>;
  }

  render() {
    const language = new Language();

    return (
      <Container className="CVEditorPage">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} />
        ) : null}
        <Card className="CVEditorPage_card">
          <Card.Header as="h1">Kreator CV</Card.Header>
          <Card.Body>
            <p>
              <h3>Dane osobowe</h3>
            </p>
            <Form id="data" onSubmit={e => this.handleSubmit(e, language)}>
              <Form id="personalData">
                Imię i nazwisko:{" "}
                <input
                  id="name"
                  type="text"
                  name="fullName"
                  placeholder="Imię i nazwisko"
                  onBlur={e => this.handleBlur(e)}
                />
                <br />
                <br />
                Data urodzenia:{" "}
                <DatePicker
                  locale="pl"
                  dateFormat="dd/MM/yyyy"
                  selected={this.state.birthDate}
                  onChange={this.handleDateChange}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <br />
                <br />
                Numer telefonu:{" "}
                <input
                  id="phone"
                  type="text"
                  name="phoneNumber"
                  placeholder="nr telefonu"
                  onBlur={e => this.handleBlur(e)}
                />
                <br />
                <br />
                Email:{" "}
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="adres e-mail"
                  onBlur={e => this.handleBlur(e)}
                />
                <br />
                <br />
              </Form>
              <br />

              <p>
                <h3>Edukacja</h3>
              </p>

              <Form id="education">
                <DatePicker
            /*      selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart */
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
                <DatePicker
            /*      selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart */
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
                <input
                  id="education"
                  type="text"
                  name="education"
                  placeholder="edukacja"
                  onBlur={e => this.handleBlur(e)}
                />
              </Form>
              <br />
              <p>
                <h3>Doświadczenie zawodowe</h3>
              </p>
              <Form id="workExperience">
                <input
                  id="workexp"
                  type="text"
                  name="workExperience"
                  onBlur={e => this.handleBlur(e)}
                />
              </Form>
              <br />
              <p>
                <h3>Umiejętności</h3>
              </p>
                {this.renderItems()}
              <Form id="skills">
                <input
                  id="skills"
                  type="text"
                  name="skills"
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
                  Dodaj
                </Button>
              </Form>
              <br />
              <p>
                <h3>Języki obce</h3>
              </p>
              <Form id="languages">
                <input
                  id="languages"
                  type="text"
                  name="languages"
                  value={language.state.name}
                  onChange={e => this.handleLanChange(e, language)}
                />
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>poziom</Form.Label>
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
                <Button onClick={language => this.handleAddLanguage(language)}>
                  Dodaj
                </Button>
              </Form>
              <Button variant="secondary" type="submit" id="saveButton">
                Zapisz
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default CVEditorPage;
