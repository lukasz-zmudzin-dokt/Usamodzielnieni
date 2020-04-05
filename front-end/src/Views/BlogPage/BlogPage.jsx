import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context";
import { Container, Card } from "react-bootstrap";
import { getPosts } from "Views/BlogPage/functions/fetchData";
import BlogPost from "Views/BlogPage/components/BlogPost";
const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  const context = useContext(UserContext);

  useEffect(() => {
    const loadOffers = async token => {
      let res;
      try {
        res = await getPosts(token, null);
        console.log(res);
      } catch (e) {
        console.log(e);
        res = [];
      }
      setPosts(res);
    };
    loadOffers(context.token);
  }, [context.token]);

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Blogi</Card.Header>
        <Card.Body>
          {posts.map((data, i) => (
            <BlogPost key={i} {...data} />
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPage;
