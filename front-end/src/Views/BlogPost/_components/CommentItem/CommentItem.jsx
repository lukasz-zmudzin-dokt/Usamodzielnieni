import React from 'react';
import { ButtonGroup, Button } from "react-bootstrap";
import "./CommentItem.css";

const CommentItem = ({ comment, onEditClick, onDeleteClick, user, ...rest }) => {
    const canModifyComment = (user) => user.type === 'Standard' || user.type === 'Admin';

    return (
        <div className="commentItem" {...rest}>
            <h5 className="commentItem__header">{`${comment.author.firstName} ${comment.author.lastName}`}</h5>
            <small className="commentItem__date">dodano: {comment.creationDate.toLocaleDateString(undefined, {})}</small>
            <p className="commentItem__content">{comment.content}</p>
            {canModifyComment(user) && (
                <ButtonGroup className="commentItem__actions" size="sm">
                    <Button onClick={(e) => onEditClick(comment.id)}>Edytuj</Button>
                    <Button onClick={(e) => onDeleteClick(comment.id)}>Usuń</Button>
                </ButtonGroup>
            )}
        </div>
    )
}

export default CommentItem
