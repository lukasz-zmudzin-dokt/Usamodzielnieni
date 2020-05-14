import React, { useState, useEffect, useContext,useRef } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import { UserContext,AlertContext } from "context";

import {
  CommentForm,
  CommentsList,
  BlogContent
} from './_components';
import {getPost} from "./functions/apiCalls";


const mapPost = (res) => ({
  header: res.header,
  title: res.title,
  id: res.id,
  content: res.content,
  category: res.category,
  comments: res.comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    creationDate: new Date(comment.date_created),
    author: mapAuthor(comment.author)
  })),
  creationDate: res.date_created,
  author: mapAuthor(res.author),
  tags: res.tags
});

const mapAuthor = (author) => ({
  email: author.email,
  firstName: author.first_name,
  lastName: author.last_name
});

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const post_Id = window.location.pathname.replace(/\/blog\/blogpost\//, '');
  const [err,setErr] = useState(false);
  const setComments = (comments) => setPost({...post, comments});

  useEffect(
    () => {
      const loadPost = async (postId, token) => {
        setIsPostLoading(true);
        let loadedPost;
        try {
          loadedPost = mapPost(await getPost(postId, token));
        } catch (e) {
          console.log(e);
          loadedPost = null;
          setErr(true);
        }
        setPost(loadedPost);
        setIsPostLoading(false);
      };
      loadPost(post_Id, user.token)
    },
    [post_Id, user.token]
  );

  const msg = isPostLoading ? (<Alert variant="info">Ładowanie zawartości bloga...</Alert>) : err ? <Alert variant="danger">Wystąpił błąd podczas wczytywania zawartości bloga.</Alert> : !post;

  return msg || (
    <Container className="blogpost_container">
      <BlogContent post={post} user={user}/>
      <Card className="blogpost_comment_card">
        <Card.Body>
          <CommentsList user={user} blogId={post.id} comments={post.comments} setComments={setComments} />
          <CommentForm blogId={post.id} afterSubmit={(comment) => setComments([ ...post.comments, comment ])} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPost;
