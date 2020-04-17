import React, { useState } from 'react'
import { Alert } from "react-bootstrap";
import { CommentItem, CommentForm } from "../";

const deleteComment = async (token, commentId) => {
    let url = `https://usamo-back.herokuapp.com/blog/comment/${commentId}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "DELETE", headers });

    if (response.status === 200) {
        return;
    } else {
        throw response.status;
    }
}

const CommentsList = ({ comments, setComments, blogId, user, ...rest }) => {
    const [editedComment, setEditedComment] = useState(null);
    const [error, setError] = useState(null);

    const onEditClick = (id) => {
        setEditedComment(id);
    }
    const onDeleteClick = async (id) => {
        try {
            await deleteComment(user.token, id);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (e) {
            console.log(e);
            setError(true);
        }
    }
    const afterSubmit = (newComment) => {
        setComments(comments.map(comment => {
            if (comment.id === newComment.id) {
                return newComment;
            }
            return comment;
        }))
        setEditedComment(null);
    }

    const msg = comments.length === 0 ? (<Alert variant="info">Brak komentarzy.</Alert>) :
                error && <Alert variant="danger">Wystąpił błąd podczas usuwania komentarza.</Alert>;

    return (
        <div {...rest}>
            <h4>Komentarze</h4>
            {msg}
            {
                comments.map((comment) => comment.id !== editedComment ? (
                    <CommentItem
                        key={comment.id}
                        user={user}
                        comment={comment}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />
                ) : (
                    <CommentForm className="mb-3" key={'form' + comment.id} blogId={blogId} comment={comment} afterSubmit={afterSubmit} />
                ))
            }
        </div>
    )
}

export default CommentsList