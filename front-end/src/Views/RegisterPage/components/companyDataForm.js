import React from 'react';
import { onChange } from '../functions/handlers';
import {Card, Form} from "react-bootstrap";

const CompanyDataForm = ({component}) => {
    let { company_name, company_street, company_city, company_postal_code, company_nip } = component.state;
    return (
        <Card
            bg="light"
            className="loginPage__cardSection col-lg mr-lg-3"
        >
            <Card.Header as="h4" className="">
                Dane firmy
            </Card.Header>
            <Card.Body className="">
                {console.log(component.state)}
                <Form.Group controlId="formGroupNameOfPlace">
                    <Form.Control
                        type="text"
                        autoComplete="on"
                        placeholder="Nazwa firmy"
                        defaultValue={company_name}
                        onBlur={e => onChange(component, e, "company_name")}
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
                        defaultValue={company_street}
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
                        defaultValue={company_city}
                        onBlur={e => onChange(component, e, "company_city")}
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
                        defaultValue={company_postal_code}
                        onChange={e => onChange(component, e, "company_postal_code")}
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
                        onChange={e => onChange(component, e, "company_nip")}
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
