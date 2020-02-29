import React from "react";
import {Card, Form} from "react-bootstrap";
import {onChange} from "../functions/handlers";

const HomeDataForm = ({component}) => {
    const { name_of_place, street, city, city_code } = component.state;
    return (
        <Card
            bg="light"
            className="loginPage__cardSection col-lg mr-lg-3"
        >
            <Card.Header as="h4" className="">
                Dane placówki
            </Card.Header>
            <Card.Body className="account_form_card">
                {/*console.log(this.state)*/}
                <Form.Group controlId="formGroupNameOfPlace">
                    <Form.Control
                        type="tel"
                        autoComplete="on"
                        placeholder="Nazwa placówki"
                        defaultValue={name_of_place}
                        onBlur={e => onChange(component, e, "name_of_place")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj nazwę placówki
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupStreet">
                    <Form.Control
                        type="tel"
                        autoComplete="on"
                        placeholder="Ulica"
                        defaultValue={street}
                        onBlur={e => onChange(component, e, "street")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj ulicę na której znajduje się placówka
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <section className="row"> */}
                <Form.Group controlId="formGroupCity" className="">
                    <Form.Control
                        type="tel"
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
                        type="tel"
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
                {/* </section> */}
            </Card.Body>
        </Card>
    );
};

export default HomeDataForm;