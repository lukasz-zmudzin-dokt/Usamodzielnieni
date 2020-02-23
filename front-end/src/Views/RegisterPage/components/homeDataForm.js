import React from "react";
import {Card, Form} from "react-bootstrap";
import {onChange} from "../functions/handlers";

class HomeDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name_of_place: "",
            street: "",
            city: "",
            city_code: ""
        };
        onChange.bind(this);
    }

    render() {
        const { name_of_place, street, city, city_code } = this.state;

        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Header as="h4" className="">
                    Dane placówki
                </Card.Header>
                <Card.Body className="">
                    {console.log(this.state)}
                    <Form.Group controlId="formGroupNameOfPlace">
                        <Form.Control
                            type="tel"
                            autoComplete="on"
                            placeholder="Nazwa placówki"
                            defaultValue={name_of_place}
                            onBlur={e => onChange(this, e, "name_of_place")}
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
                            onBlur={e => onChange(this, e, "street")}
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
                            onBlur={e => onChange(this, e, "city")}
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
                            onChange={e => onChange(this, e, "city_code")}
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
    }
}

export default HomeDataForm;