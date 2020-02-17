import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import movie_1 from "../../../assets/movie_1.png";
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";
import CVEditorTab from 'Views/CVEditorPage/components/CvEditorTab';

registerLocale("pl", polish);

class PersonalDataTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            birthDate: new Date(),
            phoneNumber: "",
            email: ""
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <CVEditorTab
                title="Dane osobowe"
                movie={movie_1}
                onNextClick={this.props.onNextClick}
            >
                <Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Imię i nazwisko:
                        </Form.Label>
                        <Form.Control
                            name="fullName"
                            inline
                            type="text"
                            required
                            defaultValue={this.state.fullName}
                            placeholder="Jan Przykładowy"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Data urodzenia:
                        </Form.Label>
                        <DatePicker
                            className="form-control"
                            locale="pl"
                            dateFormat="dd.MM.yyyy"
                            selected={this.state.birthDate}
                            onChange={birthDate => this.setState({ birthDate })}
                            withPortal
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Numer telefonu:
                        </Form.Label>
                        <Form.Control
                            name="phoneNumber"
                            type="text"
                            defaultValue={this.state.phoneNumber}
                            placeholder="+48123456789"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Adres email:
                        </Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            required
                            defaultValue={this.state.email}
                            placeholder="example@domain.com"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                </Row>
            </CVEditorTab>
        )
    }
}

export default PersonalDataTab;