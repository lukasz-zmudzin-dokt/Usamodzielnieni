import React from 'react'
import { Alert } from "react-bootstrap";
import { CommentItem } from "../";

const CommentsList = ({ comments, blogId, user, ...rest }) => {
    return (
        <div {...rest}>
            <h4>Komentarze</h4>
            {
                comments.length === 0 
                    ? (<Alert variant="info">Brak komentarzy.</Alert>) 
                    : comments.map((comment) => (<CommentItem key={comment.id} blogId={blogId} user={user} {...comment} />))
            }
        </div>
    )
}

export default CommentsList
