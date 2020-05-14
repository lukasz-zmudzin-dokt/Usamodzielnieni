import React, { useState,useRef,useContext } from 'react'
import { Alert } from "react-bootstrap";
import { CommentItem } from "../";
import proxy from "config/api";
import {AlertContext} from 'context';

const deleteComment = async (token, commentId) => {
    let url = `${proxy.blog}comment/${commentId}`;
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
    const alertC = useRef(useContext(AlertContext));

    const onDeleteClick = async (id) => {
        try {
            await deleteComment(user.token, id);
            setComments(comments.filter(comment => comment.id !== id));
             alertC.current.showAlert(
               "Pomyślnie usunięto komentarz.",
               "success"
             );
        } catch (e) {
            alertC.current.showAlert(
              "Wystąpił błąd podczas usuwania komentarza."
            );
        }
    }

    const msg = comments.length === 0 && (<Alert variant="info">Brak komentarzy.</Alert>);

    return (
        <div {...rest}>
            <h4>Komentarze</h4>
            {msg}
            {
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        user={user}
                        comment={comment}
                        onDeleteClick={onDeleteClick}
                    />
                ))
            }
        </div>
    )
}

export default CommentsList
