import React, {useState} from "react";
import {Form, Button, Col, Row} from "react-bootstrap";

const ChatForm = () => {
    const handleSubmit = () => {
        setMessage("");
        //przesłanie komentarza
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const [message, setMessage] = useState("");

    return(
        <Form onSubmit={() => handleSubmit()}>
            <Row>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        placeholder="Aa"
                        value={message}
                        onChange={e => handleChange(e)}
                        rows="1"
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">
                        Wyślij
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );              
};
 
export default ChatForm;