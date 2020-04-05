import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context";
import { Container, Card } from "react-bootstrap";
import { getPosts } from "Views/BlogPage/functions/fetchData";
import BlogPost from "Views/BlogPage/components/BlogPost";
import Filter from "Views/BlogPage/components/Filter";
const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ categories: [], tags: [] });
  const context = useContext(UserContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadOffers = async token => {
      let res;
      try {
        res = await getPosts(token, filter);
        console.log(res);
      } catch (e) {
        console.log(e);
        res = [];
      }
      setCount(res.length);
      setPosts(res);
    };
    loadOffers(context.token);
  }, [context.token, filter]);

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Blogi</Card.Header>
        <Filter
          token={context.token}
          setFilter={setFilter}
          filter={filter}
          count={count}
        />
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
