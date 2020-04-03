import React from "react";
import { Card, Container } from "react-bootstrap";
import { UserContext } from "context";
import "./style.css"

class ContactPage extends React.Component{



    render(){
        return (
            <Container>
                <Card className="contact_page_card">
                    <Card.Header className="contact_page_title">
                        <h3>Strona kontaktu</h3>
                    </Card.Header>
                    <Card.Body>
                        <h3>CARD BODY</h3>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}


ContactPage.contextType = UserContext;

export default ContactPage;