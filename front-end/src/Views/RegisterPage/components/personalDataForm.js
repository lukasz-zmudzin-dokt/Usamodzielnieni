import React from 'react';
import { Card, Form } from 'react-bootstrap';
import {onChange} from "../functions/handlers";

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            phone_number: ""
        };
        onChange.bind(this);
    }

    render() {
        const { first_name, last_name, phone_number } = this.state;

        return(
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
                            type="text"
                            autoComplete="on"
                            placeholder="Imię"
                            defaultValue={first_name}
                            onBlur={e => onChange(this, e, "first_name")}
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
                            type="text"
                            autoComplete="on"
                            placeholder="Nazwisko"
                            defaultValue={last_name}
                            onBlur={e => onChange(this, e, "last_name")}
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
                            type="tel"
                            pattern="[+]{1}[4]{1}[8]{1}[0-9]{3}[0-9]{3}[0-9]{3}"
                            autoComplete="on"
                            placeholder="Numer telefonu"
                            defaultValue={phone_number}
                            onBlur={e => onChange(this, e, "phone_number")}
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