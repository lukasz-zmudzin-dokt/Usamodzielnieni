import React from 'react';
import "./CommentItem.css";

const CommentItem = ({ content, author, creationDate, user, ...rest }) => {
    return (
        <div className="commentItem" {...rest}>
            <h5 className="commentItem__header">{`${author.firstName} ${author.lastName}`}</h5>
            <small className="commentItem__date">dodano: {creationDate.toLocaleDateString(undefined, {})}</small>
            <p className="commentItem__content">{content}</p>
            <div className="commentItem__actions">
                {user.type === 'Standard' ? (
                    <div></div>
                ) :
                user.type === 'Admin' && (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default CommentItem
