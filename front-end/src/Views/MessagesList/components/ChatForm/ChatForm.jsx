import React, {useState} from "react";
import {Form, Button, InputGroup, FormControl} from "react-bootstrap";

const ChatForm = ({sendMessage}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if(message !== "") {
            sendMessage(message);
            setMessage("");
        }
    };
    
    const keyPressed = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const [message, setMessage] = useState("");

    return(
        <Form onSubmit={(e) => handleSubmit(e)}>
            <InputGroup className="mb-3">
                <FormControl
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => keyPressed(e)}
                    as="textarea"
                    placeholder="Aa"
                />
                <InputGroup.Append>
                <Button type="submit" variant="primary">-></Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
        
    );              
};

export default ChatForm;