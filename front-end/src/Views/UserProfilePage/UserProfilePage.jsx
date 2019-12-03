import React from "react";
import { Row, Col, Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import "./style.css";

const names = {
    role: {
        admin: "Administrator",
        employer: "Pracodawca",
        common: "Podopieczny"
    },
    property: {
        username: "Nazwa użytkownika",
        role: "Rola",
        firstName: "Imię",
        lastName: "Nazwisko",
        email: "E-mail",
        phoneNumber: "Numer telefonu"
    }
}

class UserIcon extends React.Component {
    // tymczasowe - potrzebne jakieś zdjęcie lub ikona użytkownika
    render() {
        return (
            <svg width="80" height="80">
                <circle cx="40" cy="40" r="37" stroke="black" strokeWidth="3" fill="white" />
                <circle cx="40" cy="30" r="10" fill="black" />
                <path d="M 20 60 q 20 -30 40 0" fill="black" />
            </svg>
        );
    }
}

class UserProperty extends React.Component {
    render() {
        const { user, property } = this.props;

        return (
            <ListGroupItem>
                <Row>
                    <Col xs="auto"><b>{names.property[property]}:</b></Col>
                    <Col>{user[property]}</Col>
                </Row>
            </ListGroupItem>
        );
    }
}

class UserBasicInfo extends React.Component {
    render() {
        const { firstName, lastName, role } = this.props.user;
        return (
            <Row>
                <Col xs="auto"><UserIcon /></Col>
                <Col>
                    <Row><h5>{firstName + " " + lastName}</h5></Row>
                    <Row>{names.role[role]}</Row>
                </Col>
            </Row>
        );
    }
}

class UserDetails extends React.Component {
    render() {
        const { user } = this.props;
        const ignore = ["firstName", "lastName", "role"];

        const userProperties = Object.keys(user).map(key => {
            return !ignore.find(i => i === key)
                ? <UserProperty key={key} user={user} property={key} />
                : null;
        });

        return (
            <ListGroup className="list-group-flush">
                {userProperties}
            </ListGroup>
        );
    }
}

class UserProfilePage extends React.Component {
    state = {
        user: {
            username: "user1",
            role: "common",
            firstName: "Jan",
            lastName: "Kowalski",
            email: "jan.kowalski@pw.edu.pl",
            phoneNumber: "+48123456789"
        }
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Header>Mój profil</Card.Header>
                    <Card.Body>
                        <UserBasicInfo user={this.state.user} />
                    </Card.Body>
                    <UserDetails user={this.state.user} />
                </Card>
            </Container>
        );
    }
}

export default UserProfilePage;
