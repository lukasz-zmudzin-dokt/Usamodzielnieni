import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context";
import { Container, Card, Alert, CardColumns } from "react-bootstrap";
import { getPosts } from "Views/BlogPage/functions/fetchData";
import BlogPost from "Views/BlogPage/components/SmallBlogPost";
import Filter from "Views/BlogPage/components/Filter";
import "./style.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({});
  const context = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadOffers = async (token) => {
      setIsLoading(true);
      let res;
      try {
        res = await getPosts(token, filter);
      } catch (e) {
        console.log(e);
        res = [];
        setErr(true);
      }
      setIsLoading(false);
      setCount(res.length);
      setPosts(res);
    };

    loadOffers(context.token);
  }, [context.token, filter]);

  const msg = err ? (
    <Alert variant="danger">Wystąpił błąd podczas ładowania postów.</Alert>
  ) : isLoading ? (
    <Alert variant="info">Ładowanie postów...</Alert>
  ) : (
    count === 0 && (
      <Alert variant="info">Brak postów spełniających podane wymagania.</Alert>
    )
  );

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Blogi</Card.Header>
        <Filter token={context.token} setFilter={setFilter} count={count} />
        {msg ? (
          msg
        ) : (
          <CardColumns className="ml-3 mr-3">
            {posts.map((data) => (
              <BlogPost key={data.id} {...data} />
            ))}
          </CardColumns>
        )}
      </Card>
    </Container>
  );
};

export default BlogPage;
