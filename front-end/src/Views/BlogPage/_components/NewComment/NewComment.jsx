import React, { useState, useContext } from 'react'
import { Card, Form, Button, Alert } from "react-bootstrap";
import { UserContext } from "context";

const sendComment = async (token, content, blogId, commentId) => {
    let url = `https://usamo-back.herokuapp.com/job/job-offer/${id}`;
    const headers = {
      Authorization: "Token " + token,
      "Content-Type": "application/json"
    };
  
    const response = await fetch(url, { method: commentId ? "PUT" : "POST", headers });
  
    if (response.status === 200) {
      return response.json();
    } else {
      throw response.status;
    }
}

const NewComment = ({ blogId, comment, ...rest }) => {
    const [commentContent, setCommentContent] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const user = useContext(UserContext);

    if (comment) {
        setCommentContent(comment.value);
    }

    const onChange = (e) => {
        const value = e.target.value;
        setCommentContent(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendComment(
                user.token,
                commentContent,
                blogId,
                comment ? comment.id : undefined
            );
            setSubmitted(true);
        } catch (e) {
            setError(true);
        }
    }

    const msg = error ? (<Alert variant="danger">Wystąpił błąd podczas przesyłania komentarza.</Alert>) :
                submitted && (<Alert variant="success">Pomyślnie przesłano komentarz.</Alert>);

    return (
        <Card {...rest}>
            <Card.Body>
                <Card.Title>{comment ? 'Edytuj komentarz' : 'Dodaj komentarz'}</Card.Title>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="commentContent">
                        <Form.Control
                            as="textarea"
                            onChange={onChange}
                            value={commentContent}
                            required />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" />
                    </Form.Group>
                </Form>
                {msg}
            </Card.Body>
        </Card>
    )
}

export default NewComment
