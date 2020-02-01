import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import movie_1 from "../../../assets/movie_1.png";
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";
import { handleBlur, handleBirthDateChange } from 'Views/CVEditorPage/functions/handlers.js';

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
            <div>
                <Form.Label>
                    <h3>Dane osobowe</h3>
                    <br></br>
                    <img className="cv_section_img" src={movie_1} width="400vw" alt="" />
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
                        onBlur={e => handleBlur(this, e, "fullName")}
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
                        onChange={() => handleBirthDateChange(this)}
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
                        onBlur={e => handleBlur(this, e, "phoneNumber")}
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
                        onBlur={e => handleBlur(this, e, "email")}
                        className="cv_page_input"
                    />
                </Form.Group>
                <ButtonToolbar>
                    <Button className="form_navigation_prev" disabled>← Wstecz</Button>
                    <Button
                        className="form_navigation_next"
                        onClick={e => this.props.onNextClick(e)}
                    >
                        Dalej →
                    </Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default PersonalDataTab;