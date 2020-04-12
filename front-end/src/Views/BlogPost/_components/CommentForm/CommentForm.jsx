import React, { useState, useContext } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { UserContext } from "context";

const updateComment = async (token, content, commentId) => {
    let url = `https://usamo-back.herokuapp.com/blog/comment/${commentId}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "PUT", body: JSON.stringify({content}), headers });

    if (response.status === 200) {
        return response.json();
    } else {
        throw response.status;
    }
}

const addComment = async (token, content, blogId) => {
    let url = `https://usamo-back.herokuapp.com/blog/${blogId}/comment/`;
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

const CommentForm = ({ blogId, comment, afterSubmit, ...rest }) => {
    const [commentContent, setCommentContent] = useState(comment ? comment.content : "");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const user = useContext(UserContext);

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
                if (comment) {
                    await updateComment(
                        user.token,
                        commentContent,
                        comment.id
                    );
                    afterSubmit({
                        ...comment,
                        content: commentContent,
                        creationDate: new Date(Date.now())
                    })
                } else {
                    const id = await addComment(
                        user.token,
                        commentContent,
                        blogId
                    );
                    afterSubmit({
                        id: id,
                        author: {
                            firstName: user.data.first_name,
                            lastName: user.data.last_name,
                            email: user.data.email
                        },
                        content: commentContent,
                        creationDate: new Date(Date.now())
                    })
                    setCommentContent('');
                    setSubmitted(true);
                }
            } catch (e) {
                setError(true);
            }
        }
    }

    const onCancelClick = () => {
        afterSubmit(comment);
    }

    const msg = error ? (<Alert variant="danger">Wystąpił błąd podczas przesyłania komentarza.</Alert>) :
        submitted && (<Alert variant="success">Pomyślnie przesłano komentarz.</Alert>);

    return (
        <div {...rest}>
            <h5>{comment ? 'Edytuj komentarz' : 'Dodaj komentarz'}</h5>
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
                {msg}
                <Form.Group className="CommentForm__submitGroup mb-0">
                    <Button type="submit">Prześlij</Button>
                    {comment && (
                        <Button 
                            type="button"
                            variant="secondary"
                            className="ml-2"
                            onClick={onCancelClick}>
                            Anuluj
                        </Button>
                    )}
                </Form.Group>
            </Form>
        </div>
    )
}

export default CommentForm
