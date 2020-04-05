import React from 'react';
import { Card, Form } from 'react-bootstrap';

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (onBlur, data, e) => {
        const name = e.target.name;
        const value = e.target.value;
        onBlur({ ...data, [name]: value})
    };

    render () {
        let {onBlur, data} = this.props;
        let {onChange} = this;
        return (
            <Card
                bg="light"
                className="loginPage__cardSection px-0 col-lg mx-lg-3"
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
                            onChange={e => onChange(onBlur, data, e)}
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
                            onChange={e => onChange(onBlur, data, e)}
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
                            onChange={e => onChange(onBlur, data, e)}
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