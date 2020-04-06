// placeholder taki

import React from "react";
import { Card, Row, Badge, Col } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const BlogPost = data => {
  return (
    <Card>
      <IndexLinkContainer to={`/blog/blogpost/${data.id}`}>
        <Card.Body>
          <Card.Title as="h3">{data.category}</Card.Title>
          <Card.Text>{data.summary}</Card.Text>
          <Card.Text>
            <small>Tagi:</small>
            {data.tags.map((tag, i) => (
              <Badge variant="info" key={i} className="ml-1">
                {tag}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
      </IndexLinkContainer>
    </Card>
  );
};

export default BlogPost;
{
  /* <Row>
  <Col>
    <h3>{data.category}</h3>
    <p>{}</p>
    <Row>
      <Col>
       
      </Col>
    </Row>
  </Col>
</Row> */
}
