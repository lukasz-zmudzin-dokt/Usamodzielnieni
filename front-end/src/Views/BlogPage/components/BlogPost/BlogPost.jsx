import React from "react";
import { Row, Badge, Col } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const stripFromTags = str => {
  console.log(str);
  str = str.replace(/(<([^>]+)>)|(<([^>]+)\.\.\.)/gi, '');
  return str;
};

const BlogPost = ({data, ...rest}) => {
  const str = stripFromTags(data.summary);
  return (
    <IndexLinkContainer to={`/blog/blogpost/${data.id}`}>
      <Row {...rest}>
        <Col>
          <h3>{data.category}</h3>
          <p>{`${str.substring(0, 100)}...`}</p>
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
