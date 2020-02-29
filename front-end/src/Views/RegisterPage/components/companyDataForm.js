import React from 'react';
import { onChange } from '../functions/handlers';
import {Card, Form} from "react-bootstrap";

const CompanyDataForm = ({component}) => {
    let { name_of_place, street, city, city_code, company_nip } = component.state;
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
                        type="text"
                        autoComplete="on"
                        placeholder="Nazwa firmy"
                        defaultValue={name_of_place}
                        onBlur={e => onChange(component, e, "name_of_place")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj nazwę firmy
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupStreet">
                    <Form.Control
                        type="text"
                        autoComplete="on"
                        placeholder="Ulica"
                        defaultValue={street}
                        onBlur={e => onChange(component, e, "street")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj ulicę na której znajduje się firma
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupCity" className="">
                    <Form.Control
                        type="text"
                        autoComplete="on"
                        placeholder="Nazwa miasta"
                        defaultValue={city}
                        onBlur={e => onChange(component, e, "city")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj nazwę miasta
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formGroupCityCode" className="">
                    <Form.Control
                        type="text"
                        autoComplete="on"
                        placeholder="Kod pocztowy"
                        defaultValue={city_code}
                        onBlur={e => onChange(component, e, "city_code")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj kod pocztowy
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupCompanyNip" className="">
                    <Form.Control
                        type="text"
                        autoComplete="on"
                        placeholder="NIP"
                        defaultValue={company_nip}
                        onBlur={e => onChange(component, e, "company_nip")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj NIP
                    </Form.Control.Feedback>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default CompanyDataForm;
