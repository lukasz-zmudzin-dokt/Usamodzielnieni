import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import proxy from "config/api";

const stripFromTags = (str) => {
  str = str.replace(/(<([^>]+)>)|(<([^>]+)\.\.\.)/gi, "");
  return str;
};

const BlogPost = (data) => {
  const stripped_str = stripFromTags(data.summary);
  return (
    <Link className="sBlogPost__link" to={`/blog/blogpost/${data.id}`}>
      <Card>
        {
          data.header !== null ? <Card.Img variant="top" src={proxy.plain + data.header} alt="Wystąpił problem z ładowaniem nagłówka"/> : null
        }
        <Card.Body>
          <Card.Title as="h3">{data.title}</Card.Title>
          <Card.Text>{stripped_str}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Tagi:</small>
          {data.tags.length > 0 ?
            data.tags.map((tag) => (
            <Badge variant="info" key={tag} className="ml-1">
              {tag}
            </Badge>
          )) : "Brak tagów"}
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogPost;
