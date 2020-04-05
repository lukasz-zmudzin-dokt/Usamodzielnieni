// placeholder taki

import React from "react";
import { Card, Row, Badge, Col } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const BlogPost = data => {
  return (
    <IndexLinkContainer to={`/blog/blogpost/${data.id}`}>
      <Row>
        <Col>
          <h3>{data.category}</h3>
          <p>{`${data.content.substring(0, 100)}...`}</p>
          <Row>
            <Col>
              <small>Tagi:</small>
              {data.tags.map((tag, i) => (
                <Badge variant="info" key={i} className="ml-1">
                  {tag}
                </Badge>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </IndexLinkContainer>
  );
};

export default BlogPost;
