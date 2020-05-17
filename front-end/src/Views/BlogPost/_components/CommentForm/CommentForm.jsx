import React, { useState, useContext,useRef } from 'react'
import { Form, Button } from "react-bootstrap";
import { UserContext,AlertContext } from "context";
import proxy from "config/api";
import {userStatuses} from "../../../../constants/userStatuses";

const addComment = async (token, content, blogId) => {
    let url = `${proxy.blog}${blogId}/comment/`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", body: JSON.stringify({content}), headers });

    if (response.status === 200) {
        return response.json().then(res => res.id);
    } else {
        throw response.status;
    }
}

const CommentForm = ({ blogId, afterSubmit, ...rest }) => {
    const [commentContent, setCommentContent] = useState("");
    const [validated, setValidated] = useState(false);
    const user = useContext(UserContext);
    const alertC = useRef(useContext(AlertContext));

    const onChange = (e) => {
        const value = e.target.value;
        setCommentContent(value)
    }

    const onSubmit = async (e) => {
        setValidated(false);
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            setValidated(true);
            e.stopPropagation();
        } else {
            try {
                const id = await addComment(
                    user.token,
                    commentContent,
                    blogId
                );
                afterSubmit({
                    id: id,
                    author: {
                        email: user.data.email,
                        username: user.data.username
                    },
                    content: commentContent,
                    creationDate: new Date(Date.now())
                })
                setCommentContent('');
                alertC.current.showAlert("Pomyślnie przesłano komentarz.","success")
            } catch (e) {
                alertC.current.showAlert("Wystąpił błąd podczas przesyłania komentarza.")
            }
        }
    }


    return user.data && user.data.status === userStatuses.VERIFIED ? (
        <div {...rest}>
            <h5>Dodaj komentarz</h5>
            <Form 
                noValidate
                validated={validated}
                onSubmit={onSubmit}
            >
                <Form.Group controlId="commentContent">
                    <Form.Control
                        as="textarea"
                        placeholder="Treść komentarza"
                        onChange={onChange}
                        value={commentContent}
                        required />
                    <Form.Control.Feedback type="invalid">
                        Wprowadź treść komentarza.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="CommentForm__submitGroup mb-0">
                    <Button type="submit">Prześlij</Button>
                </Form.Group>
            </Form>
        </div>
    ) : null
}

export default CommentForm
