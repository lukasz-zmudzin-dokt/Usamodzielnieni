import React from "react";
import { Card, Badge } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const BlogPost = data => {
  return (
    <IndexLinkContainer to={`/blog/blogpost/${data.id}`}>
      <Card>
        <Card.Body>
          <Card.Title as="h3">{data.category}</Card.Title>
          <Card.Text>{data.summary}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Tagi:</small>
          {data.tags.map(tag => (
            <Badge variant="info" key={tag} className="ml-1">
              {tag}
            </Badge>
          ))}
        </Card.Footer>
      </Card>
    </IndexLinkContainer>
  );
};

export default BlogPost;
