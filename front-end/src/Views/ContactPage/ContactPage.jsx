import React from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { UserContext } from "context";
import "./style.css"

class ContactPage extends React.Component{

    state = {
        msgType: "",
        msgBody: ""
    }

    handleMsgBodyChange = async (e) => {
        const body = await e.target.value;
    
        this.setState({
          msgBody: body
        });
        console.log(this.state.msgBody);
      }

    handelMsgTypeChange = async (e) => {
        const type = await e.target.value;
        this.setState({
            msgType: type
        });
        console.log(this.state.msgType);
    }

    handleMsgSubmit = () => {
        return;
    }


    render(){
        return (
            <Container>
                <Card className="contact_page_card">
                    <Card.Header className="contact_page_title">
                        <h3>Support</h3>
                    </Card.Header>
                    <Card.Body>
                        <h4>Temat wiadomości</h4>
                        <Form id="contact_msg" onSubmit={this.handleMsgSubmit}>
                            <Form.Group controlId="msgTypeSelect">
                                <Form.Label>Wybierz opis najbliższy tematowi Twojej wiadomości:</Form.Label>
                                <Form.Control as="select" onChange={this.handelMsgTypeChange}>
                                    <option value=''>--wybierz temat--</option>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                    <option value='E'>E</option>
                                    <option value='Inne'>Inne</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="msgBody" onChange={this.handleMsgBodyChange}>
                                <Form.Label>Treść Twojej wiadomości</Form.Label>
                                <Form.Control as="textarea" rows="5" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Wyślij
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}


ContactPage.contextType = UserContext;

export default ContactPage;