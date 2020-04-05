import React from "react";

import { Container, Card } from "react-bootstrap";
import { NewComment, CommentsList, BlogContent } from "./_components";

const BlogPost = () => {
  return (
    <Container>
      <Card>
        <Card.Header as="h2">Blog</Card.Header>
        <Card.Body>
          <BlogContent />
          <CommentsList />
          <NewComment />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPost;
