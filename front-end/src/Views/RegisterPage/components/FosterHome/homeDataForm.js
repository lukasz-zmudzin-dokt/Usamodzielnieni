import React from "react";
import {Card, Form} from "react-bootstrap";
import {onChange} from "../../functions/handlers";

class HomeDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name_of_place: "",
            street: "",
            city: "",
            city_code: ""
        }
    }

    render() {
        const { name_of_place, street, city, city_code } = this.state;
        let {data, onBlur} = this.props;
        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Header as="h4" className="">
                    Dane placówki
                </Card.Header>
                <Card.Body className="account_form_card">
                    <Form.Group controlId="formGroupNameOfPlace">
                        <Form.Control
                            name="name_of_place"
                            type="tel"
                            autoComplete="on"
                            placeholder="Nazwa placówki"
                            defaultValue={name_of_place}
                            onBlur={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj nazwę placówki
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupStreet">
                        <Form.Control
                            name="street"
                            type="tel"
                            autoComplete="on"
                            placeholder="Ulica"
                            defaultValue={street}
                            onBlur={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj ulicę na której znajduje się placówka
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupCity" className="">
                        <Form.Control
                            name="city"
                            type="tel"
                            autoComplete="on"
                            placeholder="Nazwa miasta"
                            defaultValue={city}
                            onBlur={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj nazwę miasta
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupCityCode" className="">
                        <Form.Control
                            name="city_code"
                            type="tel"
                            autoComplete="on"
                            placeholder="Kod pocztowy"
                            defaultValue={city_code}
                            onBlur={e => onChange(onBlur, data, e)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj kod pocztowy
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
        )
    }
}

export default HomeDataForm;