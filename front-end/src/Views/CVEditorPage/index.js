import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import polish from "date-fns/locale/pl";


//import 'Views/CVEditorPage/style.css';
import Form from "react-bootstrap/Form";
registerLocale("pl", polish);

class CVEditorPage extends React.Component {
  //nie działa, jest do baza do zmian

  constructor(props) {
    super(props);
    this.state = {
      fullName: "", //czy w rejestracji będzie imię i nazwisko?
      birthDate: new Date(), //defaultowo formularz, potem może jakiś MonthPicker albo DatePicker
      phoneNumber: "",
      email: "", //import z db?
      education: "",
      workExperience: "",
      skills: "",
      languages: ""
    };

    //this.handleChange = this.handleBlur.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  // listenery do poprawy
  handleBlur = e => {
    //const { property, value } = e.target;
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    console.log(this.state);
    e.preventDefault();
  };

  handleDateChange = date => {
    this.setState({
      birthDate: date
    });
  };

  render() {
    //const months = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
    return (
      <Container className="CVEditorPage">
        <h1 className="display-4">Kreator CV</h1>
        <br />
        <p>
          <h3>Dane osobowe</h3>
        </p>
        <Form id="data" onSubmit={e => this.handleSubmit(e)}>
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
          <Form id="skills">
            <input
              id="skills"
              type="text"
              name="skills"
              onBlur={e => this.handleBlur(e)}
            />
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
              onBlur={e => this.handleBlur(e)}
            />
          </Form>

          <Button type="submit" id="saveButton">
            Zapisz
          </Button>
        </Form>
      </Container>
    );
  }
}

export default CVEditorPage;
