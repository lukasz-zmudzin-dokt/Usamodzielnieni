import React from 'react'

const CommentItem = ({ content, author, creationDate, ...rest }) => {
    return (
        <div {...rest}>
            <h5>{`${author.first_name} ${author.last_name}`}</h5>
            <p>{content}</p>
            <small>dodano: {creationDate.toLocaleDateString(undefined, {})}</small>
        </div>
    )
}

export default CommentItem
