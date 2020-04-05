import React from 'react';
import {Card, Form} from "react-bootstrap";

class CompanyDataForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (onBlur, data, e) => {
        const name = e.target.name;
        const value = e.target.value;
        onBlur({ ...data, [name]: value})
    };

    render () {
        let {data, onBlur} = this.props;
        let {onChange} = this;
        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Header as="h4" className="">
                    Dane firmy
                </Card.Header>
                <Card.Body className="">
                    <Form.Group controlId="formGroupNameOfPlace">
                        <Form.Control
                            name="name_of_place"
                            type="text"
                            placeholder="Nazwa firmy"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj nazwę firmy
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupStreet">
                        <Form.Control
                            name="street"
                            type="text"
                            placeholder="Ulica"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj ulicę na której znajduje się firma
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupCity" className="">
                        <Form.Control
                            name="city"
                            type="text"
                            placeholder="Nazwa miasta"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj nazwę miasta
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupCityCode" className="">
                        <Form.Control
                            name="city_code"
                            type="text"
                            placeholder="Kod pocztowy"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj kod pocztowy
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupCompanyNip" className="">
                        <Form.Control
                            name="company_nip"
                            type="text"
                            placeholder="NIP"
                            onChange={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj NIP
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
        );
    }
}

export default CompanyDataForm;
