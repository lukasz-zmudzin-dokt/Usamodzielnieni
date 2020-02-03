import React from "react";
import { Form } from "react-bootstrap";
import movie_1 from "../../../assets/movie_1.png";
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";
import { handleBlur, handleBirthDateChange } from 'Views/CVEditorPage/functions/handlers.js';
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

    render() {
        return (
            <CVEditorTab
                title="Dane osobowe"
                movie={movie_1}
                onNextClick={this.props.onNextClick}
            >
                <Form.Group controlId="">
                    <Form.Label column={""} sm="2">
                        Imię i nazwisko:
                    </Form.Label>
                    <Form.Control
                        inline
                        type="text"
                        required
                        defaultValue={this.state.fullName}
                        placeholder="Jan Przykładowy"
                        onBlur={e => handleBlur(this, e, "fullName")}
                    />
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label column={""} sm="2">
                        Data urodzenia:{" "}
                    </Form.Label>
                    <DatePicker
                        className="form-control"
                        locale="pl"
                        dateFormat=" dd.MM.yyyy"
                        selected={this.state.birthDate}
                        onChange={() => handleBirthDateChange(this)}
                        withPortal
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label column={""} sm="2">
                        Numer telefonu:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={this.state.phoneNumber}
                        placeholder="+48123456789"
                        onBlur={e => handleBlur(this, e, "phoneNumber")}
                    />
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label column={""} sm="2">
                        Adres email:
                    </Form.Label>
                    <Form.Control
                        type="email"
                        required
                        defaultValue={this.state.email}
                        placeholder="example@domain.com"
                        onBlur={e => handleBlur(this, e, "email")}
                    />
                </Form.Group>
            </CVEditorTab>
        )
    }
}

export default PersonalDataTab;