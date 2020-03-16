import React from "react";
import "./style.css";
import {Card, Container} from "react-bootstrap";
import UsersToApprove from "./components/UsersToApprove";

const users = [
    {
        id: 0,
        email: "maciej.kozlowski@gmail.dom",
        username: "maciekolejarz64",
        last_name: "Kozłowski",
        first_name: "Maciej",
        phone_number: "123456789",
        facility_name: "NSP 45 im. Adama Małysza",
        facility_address: "Skocznia narciarska w Zakopanem"
    },
    {
        id: 1,
        email: "lalalalala@gmail.dom",
        username: "lalala",
        last_name: "Lalawska",
        first_name: "Lalka",
        phone_number: "987654321",
        facility_name: "NSP 45 im. Adama Małysza",
        facility_address: "Skocznia narciarska w Zakopanem"
    },
    {
        id: 2,
        email: "e@ma.il",
        username: "amka",
        last_name: "Maj",
        first_name: "Ola",
        phone_number: "123456789",
        facility_name: "NSP 45 im. Adama Małysza",
        facility_address: "Długa 8"
    },
    {
        id: 3,
        email: "jakistakidluzszyadresemailowy@email.rerere",
        username: "Usernameteżjakiśtakiprzydługi",
        last_name: "Pablorodriguessenioritazorro",
        first_name: "Pablorodriguessenioritazorro",
        phone_number: "123456789",
        facility_name: "Zespół szkoł wliczających w siebie żłobek, przedszkole i połowę budynków miasta ponieważ jest to jedno wielkie miasteczko uczelniano studencko uczniowskie",
        facility_address: "ul. Nieuwierzyszżenazwaulicymożebyćtakadługaponieważzdarzasiętoniezwyklerzadko 18, 12-345 Berlin Zachodni"
    },
    {
        id: 4,
        email: "maciej.kozlowski@gmail.dom",
        username: "maciekolejarz64",
        last_name: "Kozłowski",
        first_name: "Maciej",
        phone_number: "123456789",
        facility_name: "NSP 45 im. Adama Małysza",
        facility_address: "Skocznia narciarska w Zakopanem"
    },
    {
        id: 5,
        email: "maciej.kozlowski@gmail.dom",
        username: "maciekolejarz64",
        last_name: "Kozłowski",
        first_name: "Maciej",
        phone_number: "123456789",
        facility_name: "NSP 45 im. Adama Małysza",
        facility_address: "Skocznia narciarska w Zakopanem"
    },
    {
        id: 6,
        email: "maciej.kozlowski@gmail.dom",
        username: "maciekolejarz64",
        last_name: "Kozłowski",
        first_name: "Maciej",
        phone_number: "123456789",
        facility_name: "NSP 45 im. Adama Małysza",
        facility_address: "Skocznia narciarska w Zakopanem"
    },
];

class UserApprovalPage extends React.Component {
    render() {
        return(
            <Container>
                <div className="background">
                    <Card className="users-approval-card no-border">
                        <Card.Header className="border pb-4"><h3>Użytkownicy do akceptacji</h3></Card.Header>
                        <Card.Body className="border">
                            <UsersToApprove users={users} />
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default UserApprovalPage;