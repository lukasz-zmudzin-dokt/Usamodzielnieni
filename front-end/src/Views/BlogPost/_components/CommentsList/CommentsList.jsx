import React from 'react'
import { Alert } from "react-bootstrap";
import { CommentItem } from "../";

const CommentsList = ({ comments, blogId, ...rest }) => {
    return comments.length === 0 ? (<Alert variant="info">Brak komentarzy.</Alert>) : (
        <div {...rest}>
            {comments.map((comment) => (<CommentItem key={comment.id} {...comment} />))}
        </div>
    )
}

export default CommentsList
