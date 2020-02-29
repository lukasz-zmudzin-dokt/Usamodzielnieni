import React from "react";
import {Container, Card, Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import bgImage from "../../assets/fot..png";
import { connect } from "react-redux";
import { setUserToken } from "redux/actions";
import PersonalDataForm from "./components/personalDataForm";
import AccountForm from "./components/accountForm";
import {renderRedirect, renderSection} from "./functions/handlers";
import {handleSubmit} from "./functions/submitForm";



class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            passwordR: "",
            company_nip: "",
            name_of_place: "",
            street: "",
            city: "",
            city_code: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            account_type: "Podopiecznym",
            areEqual: true,
            validated: false,
            redirect: false
        };
    }

    selectType = (e) => {
        this.setState({
            account_type: e.target.value
        });
    };

    render() {
        const { validated, incorrect, message, correct } = this.state;
        const { selectType } = this;
        const types = this.props.accountTypes || ['Podopiecznym', 'Pracodawcą'];
        return (
            <Container className="loginPage loginPage__register">
                {window.innerWidth >= 768 ? (
                    <img className="loginPage__bgImage" src={bgImage} alt="Tło" />
                ) : null}
                <Card className="loginPage__card">
                    <Card.Header as="h2" className="loginPage__header">
                        Rejestracja
                    </Card.Header>
                    <Card.Body className="loginPage__body">
                        <div className="register_account_type">
                            <p>Jestem:</p>
                            <Form.Control
                                className="register_radio_type"
                                as="Select"
                                onChange={e => selectType(e)}
                                defaultValue={this.state.account_type}
                            >
                                {types.map(type => (<option value={type}>{type}</option>))}
                            </Form.Control>
                        </div>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => handleSubmit(this, e)}
                            className="loginPage__form primary"
                        >
                            <section className="row">
                                <PersonalDataForm component={this}/>
                                {renderSection(this)}
                                <AccountForm component={this}/>
                                {console.log(this.state)}
                            </section>
                            <Button
                                variant="secondary"
                                className="loginPage__button"
                                type="submit"
                            >
                                Utwórz konto
                            </Button>
                        </Form>
                        {incorrect ? (
                            <div className="loginPage__messageFail">
                                <small className="loginPage__failure">{message}</small>
                            </div>
                        ) : null}
                        {correct ? (
                            <div className="loginPage__messageFail">
                                <small className="loginPage__correct">{message}</small>
                            </div>
                        ) : null}
                        <div className="loginPage__links">
                            <Link to="/login" className="loginPage__link">
                                Masz już konto? Zaloguj się!
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                {renderRedirect(this)}
            </Container>
        );
    }
}

export default connect(null, { setUserToken })(RegisterPage);
