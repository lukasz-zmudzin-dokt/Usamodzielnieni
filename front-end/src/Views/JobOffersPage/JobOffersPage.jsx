import React from "react";
import { Container, Row } from "react-bootstrap";
import "./style.css";

/*const offers = [
    {
        title: "Stolarz poszukiwany!",
        description: "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
        company_name: "Rębacze z Cintry sp. z o.o.",
        first_name: "Jarosław",
        last_name: "Psikuta",
        email: "paniewidzisztamsnakońcu@gmail.com",
        phone: "133792137"
    }
];*/

class JobOffersPage extends React.Component {

    state = {
        user: {
            username: "user1",
            role: "common",
            firstName: "Jan",
            lastName: "Kowalski",
            email: "jan.kowalski@pw.edu.pl",
            phoneNumber: "+48123456789"
        }
    };

    render() {
        console.log("JobOffersPage");
        return (
            <Container>
                <h6> ELO </h6>
            </Container>
        );
    }
}

export default JobOffersPage;