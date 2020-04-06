import {Card, Form} from "react-bootstrap";
import React from "react";

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = (onBlur, data, e) => {
        const name = e.target.name;
        const value = e.target.value;
        onBlur({ ...data, [name]: value})
    };

    render() {
        let {data, onBlur} = this.props;
        let {onChange} = this;
        return(
            <Card bg="light" className="loginPage__cardSection px-0 col-lg mr-lg-3">
                <Card.Header as="h4" className="">
                    Dane konta
                </Card.Header>
                <Card.Body className="">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={e => onChange(onBlur, data, e)}
                            className="loginPage__input"
                            maxLength="60"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj właściwy email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupUsername">
                        <Form.Control
                            name="username"
                            type="text"
                            placeholder="Nazwa użytkownika"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                            minLength="6"
                            maxLength="30"
                        />
                        <Form.Control.Feedback type="invalid">
                            Minimalna ilośc znaków: 6
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Hasło"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                            minLength="6"
                            maxLength="128"
                        />

                        <Form.Control.Feedback type="invalid">
                            Minimalna ilośc znaków: 6
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPasswordRepeat">
                        <Form.Control
                            name="passwordR"
                            type="password"
                            placeholder="Powtórz hasło"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                            minLength="6"
                            maxLength="128"
                        />
                        <Form.Control.Feedback type="invalid">
                            Minimalna ilośc znaków: 6
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
        )
    }
}



export default AccountForm;