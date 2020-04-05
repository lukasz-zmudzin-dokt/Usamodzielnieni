import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import { UserContext } from "context";
import {
  CommentForm,
  CommentsList,
  BlogContent
} from './_components';

const getPost = async (id, token) => {
  let url = `https://usamo-back.herokuapp.com/blog/blogpost/${id}`;
  console.log(url);
  const headers = {
      Authorization: "Token " + token,
      "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
      return response.json().then(res => mapPost(res));
  } else {
      throw response.status;
  }
};

const mapPost = (res) => ({
  id: res.id,
  content: res.content,
  comments: res.comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    creationDate: comment.date_created,
    author: mapAuthor(comment.author)
  })),
  author: mapAuthor(res.author),
  tags: res.tags
});

const mapAuthor = (author) => ({
  email: author.email,
  firstName: author.first_name,
  lastName: author.last_name
});

const BlogPost = props => {
  const [post, setPost] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  const post_Id = window.location.pathname.replace(/\/blog\/blogpost\//, ''); // TODO
  console.log(props)
  useEffect(
    () => {
      const loadPost = async (postId, token) => {
        setIsPostLoading(true);
        let loadedPost;
        try {
          loadedPost = await getPost(postId, token);
        } catch (e) {
          console.log(e);
          loadedPost = null;
          setError(true);
        }
        setPost(loadedPost);
        setIsPostLoading(false);
      };
      loadPost(post_Id, user.token)
    },
    [post_Id, user.token]
  );

  const msg = error ? (<Alert variant="danger">Wystąpił błąd podczas wczytywania zawartości bloga.</Alert>) :
              isPostLoading ? (<Alert variant="info">Ładowanie zawartości bloga...</Alert>) :
              !post && (<Alert>null</Alert>);

  return msg || (
    <Container className="blogpost_container">
      <BlogContent post={post} type={user.type}/>
      <Card className="blogpost_comment_card">
        <Card.Body>
          <CommentsList comments={post.comments} />
          <CommentForm />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPost;
