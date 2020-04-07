import React from "react";
import { Card, Container, CardColumns, Button } from "react-bootstrap";
import { UserContext } from "context";
import "./style.css"

class ContactPage extends React.Component {

    copyToClipboard = (text) => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    render() {
        return (
            <Container>
                <Card className="contact_page_card">
                    <Card.Header className="contact_page_title">
                        <h3 align="left">Kontakt i lista przydatnych telefonów</h3>
                    </Card.Header>
                    <Card.Body className='bg_card'>
                        <CardColumns>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="custom_card">
                                    <Card.Title>Telefon Zaufania Dla Dzieci i Młodzieży</Card.Title>
                                    <Card.Text>
                                        116 111
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="light" size="sm" onClick={e => this.copyToClipboard("116 111")}>
                                        Skopiuj ten numer
                                    </Button>
                                </Card.Footer>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="custom_card">
                                    <Card.Title>Telefon Zaufania dla Osób Dorosłych w Kryzysie Emocjonalnym</Card.Title>
                                    <Card.Text>
                                        116 123
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="light" size="sm" onClick={e => this.copyToClipboard("116 123")}>
                                        Skopiuj ten numer
                                    </Button>
                                </Card.Footer>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="custom_card">
                                    <Card.Title>Ogólnopolski Telefon Zaufania „Narkotyki – Narkomania”</Card.Title>
                                    <Card.Text>
                                        801 199 990
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="light" size="sm" onClick={e => this.copyToClipboard("801 199 990")}>
                                        Skopiuj ten numer
                                    </Button>
                                </Card.Footer>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="custom_card">
                                    <Card.Title>Telefon Zaufania "Uzależnienia behawioralne"</Card.Title>
                                    <Card.Text>
                                        801 889 880
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="light" size="sm" onClick={e => this.copyToClipboard("801 889 880")}>
                                        Skopiuj ten numer
                                    </Button>
                                </Card.Footer>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="custom_card">
                                    <Card.Title>Linia wsparcia dla osób w stanie kryzysu psychicznego</Card.Title>
                                    <Card.Text>
                                        800 70 22 22
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="light" size="sm" onClick={e => this.copyToClipboard("800 70 22 22")}>
                                        Skopiuj ten numer
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </CardColumns>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default ContactPage;