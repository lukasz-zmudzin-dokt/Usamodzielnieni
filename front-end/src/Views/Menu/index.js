import React from "react";
import "Views/Menu/style.css";
import {Row, Col, Container, Button, ButtonToolbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import logo from "assets/logo.png";
import {connect} from "react-redux";
import {setUserToken} from "../../redux/actions";
import Cookies from "universal-cookie";
import {Redirect} from 'react-router-dom';

const cookies = new Cookies();

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token || undefined
        }
    }

    userLogout = e => {
        const token = this.props.token;
        const url = "https://usamo-back.herokuapp.com/account/logout/";
        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "token " + token
            },
            body: {}
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                res.json().then(responseValue => {
                    console.log(responseValue);
                    console.log("Wylogowano");
                    this.props.setUserToken(undefined);
                    cookies.remove("token", {path: "/"});
                    return (
                        <Redirect to="/"/>
                    );
                });
            }
        });
    };

    displayButtonToolbar() {
        if (this.props.token === undefined)
            return (
                <ButtonToolbar>
                    <LinkContainer to="/newAccount">
                        <Button className="menu-button-big menu-button-white">Utwórz konto</Button>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Button className="menu-button-big menu-button-white" >Zaloguj się</Button>
                    </LinkContainer>
                </ButtonToolbar>
            );
        else return (
            <ButtonToolbar>
                <LinkContainer to="/user">
                    <Button className="menu-button-big menu-button-white" >Profil</Button>
                </LinkContainer>
                <Button className="menu-button-big menu-button-white" onClick={e => this.userLogout(e)}>Wyloguj się</Button>
            </ButtonToolbar>
        );
    }

    render() {

        return (

            <Container className="Menu" fluid={true}>
                <div className="menu-background d-flex justify-content-center align-items-center">
                    <Row>
                        <Col/>
                        <Col xs={7}>
                            <img src={logo} className="menu-logo"/>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="menu-button-row">
                        <Col />
                        <Col>
                            {this.displayButtonToolbar()}
                        </Col>
                        <Col />
                    </Row>
                    <Row className="menu-button-row">
                        <Col />
                        <Col >
                            <ButtonToolbar>
                                <LinkContainer to={this.props.token === undefined ? "/login" : "/cvEditor"}>
                                    <Button className="menu-button-small menu-button-white" >Kreator CV</Button>
                                </LinkContainer>
                                <Button className="menu-button-small menu-button-white disabled">Jak zacząć?</Button>
                                <Button className="menu-button-small menu-button-white disabled">Oferty pracy</Button>
                            </ButtonToolbar>
                        </Col>
                        <Col />
                    </Row>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps:", state);
    const { token } = state.user;
    return { token };
};

export default connect(mapStateToProps, {setUserToken})(Menu);
