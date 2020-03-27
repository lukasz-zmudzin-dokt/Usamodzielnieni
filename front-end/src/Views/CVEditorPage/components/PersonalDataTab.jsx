import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import movie_1 from "../../../assets/movie_1.png";
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";
import { CVEditorTab } from '.';

registerLocale("pl", polish);

class PersonalDataTab extends React.Component {
    constructor(props) {
        super(props);

        this.props.onChange({
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            phoneNumber: "",
            email: ""
        })
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.props.onChange({ ...this.props.data, [name]: value })
    } 

    render() {
        const { data } = this.props;

        if (data === null) return null;

        return (
            <CVEditorTab
                title="Dane osobowe"
                movie={movie_1}
                onNextClick={this.props.onNextClick}
            >
                <Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Imię:
                        </Form.Label>
                        <Form.Control
                            name="firstName"
                            inline
                            type="text"
                            required
                            defaultValue={data.firstName}
                            placeholder="Jan"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Nazwisko:
                        </Form.Label>
                        <Form.Control
                            name="lastName"
                            inline
                            type="text"
                            required
                            defaultValue={data.lastName}
                            placeholder="Przykładowy"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Data urodzenia:
                        </Form.Label>
                        <DatePicker
                            className="form-control"
                            locale="pl"
                            dateFormat="dd.MM.yyyy"
                            selected={data.birthDate}
                            onChange={birthDate => this.props.onChange({ ...this.props.data, birthDate })}
                            withPortal
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>
                            Numer telefonu:
                        </Form.Label>
                        <Form.Control
                            name="phoneNumber"
                            type="text"
                            defaultValue={data.phoneNumber}
                            placeholder="+48123456789"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} sm="6" controlId="">
                        <Form.Label>
                            Adres email:
                        </Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            required
                            defaultValue={data.email}
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