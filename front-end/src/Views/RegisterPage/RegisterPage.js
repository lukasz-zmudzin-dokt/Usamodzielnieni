import React from "react";
import {Container, Card, Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import bgImage from "../../assets/fot..png";
import PersonalDataForm from "./components/personalDataForm";
import AccountForm from "./components/accountForm";
import {renderRedirect, renderSection} from "./functions/handlers";
import {handleSubmit} from "./functions/submitForm";
import { UserContext } from "context";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalData: null,
            homeData: null,
            companyData: null,
            accountData: null,

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
                        <Form.Group className="register_account_type">
                            <Form.Label>Jestem:</Form.Label>
                            <Form.Control
                                data-testid="typeSelector"
                                className="register_radio_type"
                                as="select"
                                onChange={e => selectType(e)}
                                defaultValue={this.state.account_type}
                            >
                                {types.map(type => (<option key={type} value={type}>{type}</option>))}
                            </Form.Control>
                        </Form.Group>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => handleSubmit(this, e)}
                            className="loginPage__form primary"
                        >
                            <section className="row">
                                <PersonalDataForm
                                    data={this.state.personalData}
                                    onBlur={personalData => this.setState({personalData})}
                                />
                                {renderSection(this)}
                                <AccountForm
                                    data={this.state.accountData}
                                    onBlur={accountData => this.setState({accountData})}
                                />
                                {console.log(this.state)}
                            </section>
                            <Button
                                variant="secondary"
                                className="loginPage__button"
                                type="submit"
                                data-testid="submitBtn"
                            >
                                Utwórz konto
                            </Button>
                        </Form>
                        {incorrect ? (
                            <div className="loginPage__messageFail">
                                <small className="loginPage__failure" data-testid="incorrectMsg">{message}</small>
                            </div>
                        ) : null}
                        {correct ? (
                            <div className="loginPage__messageFail">
                                <small className="loginPage__correct" data-testid="correctMsg">{message}</small>
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

RegisterPage.contextType = UserContext;

export default RegisterPage;
