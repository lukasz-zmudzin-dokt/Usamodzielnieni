import React from "react";
import {Container, Card, Form, Button, Alert} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import PersonalDataForm from "./components/Personal/personalDataForm";
import AccountForm from "./components/Account/accountForm";
import {handleIncorrectResponse} from "./functions/handlers";
import {handleSubmit} from "./functions/submitForm";
import { UserContext } from "context";
import HomeDataForm from "./components/FosterHome/homeDataForm";
import CompanyDataForm from "./components/Company/companyDataForm";
import {sendData} from "./functions/sendData";
import "./RegisterPage.css";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalData: null,
            homeData: null,
            companyData: null,
            accountData: null,

            account_type: "Podopiecznym",
            areEqual: undefined,
            validated: false,
            redirect: false,
            submitted: false,
            fail_message: "",
            error_flag: false,
            incorrect_input: false
        };
    };



    selectType = (e) => {
        this.setState({
            account_type: e.target.value
        });
    };

    renderSection = () => {
        switch(this.state.account_type) {
            case "Podopiecznym": {return (
                <HomeDataForm
                    data={this.state.homeData}
                    onBlur={homeData => this.setState({homeData})}
                /> )}
            case "Pracodawcą": {return (
                <CompanyDataForm
                    data={this.state.companyData}
                    onBlur={companyData => this.setState({companyData})}
                /> )}
            case "Administratorem": {return null;}
            default: {
                return null;
            }
        }
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };

    setValidated = () => {
        this.setState({
            validated: true
        })
    };

    setEqual = () => {
        this.setState({
            areEqual: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/user" />;
        }
    };

    handleResponse = async (e) => {
        const data = {
          personalData: this.state.personalData,
          homeData: this.state.homeData,
          companyData: this.state.companyData,
          accountData: this.state.accountData,
          account_type: this.state.account_type
        };

        const isOK = handleSubmit(data, e);
        this.setValidated();
        if (isOK) {
            this.setEqual();
            const contextData = await sendData(data, e).then(response => {
                const {status} = response;
                if (status === 201) {
                    const {token, type} = response;
                    return {
                        token: token,
                        type: type,
                        status: status
                    };
                } else {
                    return response;
                }
            });

            const {status} = contextData;
            if (status === 201) {
                const {token, type} = contextData;
                this.context.login(token, type);
                this.setRedirect();
            } else {
                const msg = handleIncorrectResponse(status);
                this.setState({
                    fail_message: msg,
                    error_flag: true
                })
            }
        } else {
            this.setState({
                incorrect_input: true
            })
        }

    };

    render() {
        const { validated, error_flag, fail_message, incorrect_input, account_type, accountData, personalData, redirect } = this.state;
        const { selectType, renderSection, handleResponse, renderRedirect } = this;
        const types = this.props.accountTypes || ['Podopiecznym', 'Pracodawcą'];
        return (
            <Container className="loginPage loginPage__register">
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
                                defaultValue={account_type}
                            >
                                {types.map(type => (<option key={type} value={type}>{type}</option>))}
                            </Form.Control>
                        </Form.Group>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={ e => handleResponse(e) }
                            className="loginPage__form primary"
                        >
                            <section className="row">
                                <PersonalDataForm
                                    data={personalData}
                                    onBlur={personalData => this.setState({personalData})}
                                />
                                {renderSection()}
                                <AccountForm
                                    data={accountData}
                                    onBlur={accountData => this.setState({accountData})}
                                />
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
                        {incorrect_input ? (e => e.stopPropagation()) : null}
                        {error_flag ? (
                            <div className="loginPage__messageFail">
                                <Alert variant="danger" className="loginPage__failure" data-testid="incorrectMsg">{fail_message}</Alert>
                            </div>
                        ) : null}
                        <div className="loginPage__links">
                            <Link to="/login" className="loginPage__link">
                                Masz już konto? Zaloguj się!
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                {renderRedirect(redirect)}
            </Container>
        );
    }
}

RegisterPage.contextType = UserContext;

export default RegisterPage;
