import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import movie_1 from "assets/movie_1.png";
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";
import { CVEditorTab } from "../";

registerLocale("pl", polish);

class PersonalDataTab extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.data === null) {
      this.props.onChange({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        email: "",
      });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.props.onChange({ ...this.props.data, [name]: value });
  };

  render() {
    const { data, validated } = this.props;

    if (data === null) return null;

    return (
      <CVEditorTab
        title="Dane osobowe"
        movie={movie_1}
        video={this.props.video}
        onNextClick={this.props.onNextClick}
        comments={this.props.comments}
        loading={this.props.loading}
        error={this.props.error}
        showComments={this.props.showComments}
        errVid={this.props.errVid}
      >
        <Form ref={this.props.refValue} noValidate validated={validated}>
          <Row>
            <Form.Group as={Col} xs={12} md={6} controlId="firstName">
              <Form.Label>Imię:</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                required
                minLength="1"
                maxLength="30"
                defaultValue={data.firstName}
                placeholder="Jan"
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                Imię jest wymagane.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="lastName">
              <Form.Label>Nazwisko:</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                required
                minLength="1"
                maxLength="50"
                defaultValue={data.lastName}
                placeholder="Przykładowy"
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                Nazwisko jest wymagane.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label
                htmlFor="birthDate"
                className={validated && !data.birthDate && "is-invalid"}
              >
                Data urodzenia:
              </Form.Label>
              <DatePicker
                id="birthDate"
                className="form-control"
                locale="pl"
                placeholderText="Data urodzenia"
                dateFormat="dd.MM.yyyy"
                selected={data.birthDate}
                onChange={(birthDate) =>
                  this.props.onChange({ ...this.props.data, birthDate })
                }
                withPortal
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                required
                maxDate={new Date(Date.now())}
              />
              <Form.Control.Feedback type="invalid">
                Data urodzenia jest wymagana.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="phoneNumber">
              <Form.Label>Numer telefonu:</Form.Label>
              <Form.Control
                name="phoneNumber"
                type="text"
                required
                minLength="1"
                maxLength="12"
                defaultValue={data.phoneNumber}
                placeholder="123456789"
                pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                Podaj numer telefonu w formacie: 123123123
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={12} md={6} controlId="email">
              <Form.Label>Adres email:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                required
                minLength="1"
                maxLength="254"
                defaultValue={data.email}
                placeholder="example@domain.com"
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                Adres email jest wymagany.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </CVEditorTab>
    );
  }
}

export default PersonalDataTab;
