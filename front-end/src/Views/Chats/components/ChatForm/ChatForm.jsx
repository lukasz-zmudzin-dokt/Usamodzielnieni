import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import FormGroup from "components/FormGroup";

const ChatForm = ({sendMessage}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if(message !== "") {
            sendMessage(message);
            setMessage("");
        }
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