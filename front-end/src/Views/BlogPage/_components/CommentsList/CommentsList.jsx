import React, { useState, useEffect, useContext } from 'react'
import { Alert } from "react-bootstrap";
import { UserContext } from "context";
import { CommentItem } from "../";

const getComments = async (blogId, token) => {
    let url = `https://usamo-back.herokuapp.com/job/job-offer/${id}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };
  
    const response = await fetch(url, { method: "GET", headers });
  
    if (response.status === 200) {
        return response.json().then(res => mapComments(res));
    } else {
        throw response.status;
    }
}

const mapComments = (res) => res.map(comment => ({
    id: comment.id,
    content: comment.content,
    author: comment.author,
    creationDate: comment.creationDate
}))

const CommentsList = ({ blogId, ...rest }) => {
    const [comments, setComments] = useState([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const [error, setError] = useState(false);
    const user = useContext(UserContext);

    useEffect(
        () => {
          const loadComments = async (blogId, token) => {
            setIsCommentsLoading(true);
            let loadedComments;
            try {
              loadedComments = await getComments(blogId, token);
            } catch (e) {
              console.log(e);
              loadedComments = [];
              setError(true);
            }
            setComments(loadedComments);
            setIsCommentsLoading(false);
          }
          loadComments(blogId, user.token)
        },
        [blogId, user.token]
    );

    const msg = error ? (<Alert variant="danger">Wystąpił błąd podczas wczytywania listy komentarzy.</Alert>) :
                isCommentsLoading ? (<Alert variant="info">Ładowanie listy komentarzy...</Alert>) :
                comments.length === 0 && (<Alert variant="info">Brak komentarzy.</Alert>)

    return msg || (
        <div {...rest}>
            {comments.map((comment) => (<CommentItem key={comment.id} {...comment} />))}
        </div>
    )
}

export default CommentsList
