import React from 'react';
import { Card, Form } from 'react-bootstrap';
import {onChange} from "Views/RegisterPage/functions/handlers";

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            phone_number: ""
        }
    }

    render () {
        let {first_name, last_name, phone_number} = this.state;
        let {onBlur, data} = this.props;
        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Header as="h4" className="">
                    Dane osobowe
                </Card.Header>
                <Card.Body className="">
                    <Form.Group controlId="formGroupFirstName" className="">
                        <Form.Control
                            name="first_name"
                            type="text"
                            placeholder="Imię"
                            defaultValue={first_name}
                            onBlur={e => onChange(onBlur, data, e)}
                            required
                            minLength="1"
                            maxLength="30"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj imię
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupLastName" className="">
                        <Form.Control
                            name="last_name"
                            type="text"
                            placeholder="Nazwisko"
                            defaultValue={last_name}
                            onBlur={e => onChange(onBlur, data, e)}
                            required
                            minLength="1"
                            maxLength="30"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj nazwisko
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupPhoneNumber">
                        <Form.Control
                            name="phone_number"
                            type="tel"
                            required
                            pattern="[+]{1}[4]{1}[8]{1}[0-9]{3}[0-9]{3}[0-9]{3}"
                            placeholder="Numer telefonu"
                            defaultValue={phone_number}
                            onBlur={e => onChange(onBlur, data, e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj numer telefonu w formacie: +48123123123
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
        )
    }
}
export default PersonalDataForm;