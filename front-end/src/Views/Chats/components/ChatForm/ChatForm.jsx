import React, {useState} from "react";
import {Form, Button, Col, Row} from "react-bootstrap";
import FormGroup from "components/FormGroup";

const ChatForm = ({sendMessage}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(message);
        sendMessage(message);
        setMessage("");
    };

    const [message, setMessage] = useState("");

    return(
        
        <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup
                    id="message"
                    type="textarea"
                    setVal={(val) => setMessage(val)}
                    val={message}
                    length={{ min: 1, max: 1000 }}
                />
                <Form.Group>
                    <Button type="submit">
                        Wyślij
                    </Button>
                </Form.Group>
        </Form>
    );              
};
 
export default ChatForm;