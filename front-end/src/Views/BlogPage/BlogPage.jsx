import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import { UserContext } from "context";
import {
  NewComment,
  CommentsList,
  BlogContent
} from './_components';

const getBlog = async (id, token) => {
  let url = `https://usamo-back.herokuapp.com/blog/blogpost/${id}`;
  const headers = {
      Authorization: "Token " + token,
      "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
      return response.json().then(res => mapBlog(res));
  } else {
      throw response.status;
  }
}

const mapBlog = (res) => ({
  id: res.id,
  content: res.content,
  comments: res.comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    creationDate: comment.date_created,
    author: mapAuthor(comment.author)
  })),
  author: mapAuthor(res.author)
})

const mapAuthor = (author) => ({
  email: author.email,
  firstName: author.first_name,
  lastName: author.last_name
})

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  const blogId = 1; // TODO

  useEffect(
    () => {
      const loadBlog = async (blogId, token) => {
        setIsBlogLoading(true);
        let loadedBlog;
        try {
          loadedBlog = await getBlog(blogId, token);
        } catch (e) {
          console.log(e);
          loadedBlog = null;
          setError(true);
        }
        setBlog(loadedBlog);
        setIsBlogLoading(false);
      }
      loadBlog(blogId, user.token)
    },
    [blogId, user.token]
  );

  const msg = error ? (<Alert variant="danger">Wystąpił błąd podczas wczytywania zawartości bloga.</Alert>) :
              isBlogLoading ? (<Alert variant="info">Ładowanie zawartości bloga...</Alert>) :
              !blog && (<Alert>null</Alert>);

  return msg || (
    <Container>
      <Card>
        <Card.Header as="h2">Blog</Card.Header>
        <Card.Body>
          <BlogContent blog={blog} />
          <CommentsList comments={blog.comments} />
          <NewComment />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPage;
