import React from 'react';
import { ButtonGroup, Button } from "react-bootstrap";
import "./CommentItem.css";
import {staffTypes} from "constants/staffTypes";
import {DeletionModal} from "components";
import {useState} from "react";

const CommentItem = ({ comment, onDeleteClick, user, ...rest }) => {
    const canModifyComment = (user) => (comment.author.email === user.data.email) 
                                    || (user.type === 'Staff' && user.data.group_type.includes(staffTypes.BLOG_MODERATOR));
    const handleOnClick = () => {
        setShowModal(true);
    }
    const [deletionConfirmed, setDeletionConfirmed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    if(deletionConfirmed)
        onDeleteClick(comment.id);

    return (
        <div className="commentItem" {...rest}>
            {DeletionModal(showModal, setShowModal, setDeletionConfirmed, "Czy na pewno chcesz usunąć ten komentarz?")}
            <h5 className="commentItem__header">{`${comment.author.firstName} ${comment.author.lastName}`}</h5>
            <small className="commentItem__date">dodano: {comment.creationDate.toLocaleDateString(undefined, {})}</small>
            <p className="commentItem__content">{comment.content}</p>
            {canModifyComment(user) && (
                <ButtonGroup className="commentItem__actions" size="sm">
                    <Button onClick={handleOnClick}>Usuń</Button>
                </ButtonGroup>
            )}
        </div>
    )
}

export default CommentItem
