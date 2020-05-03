import React, { useState, useEffect, useContext } from "react";
import { UserContext, AlertContext } from "context";
import { Container, Card, Alert, CardColumns } from "react-bootstrap";
import { getPosts } from "Views/BlogPage/functions/fetchData";
import BlogPost from "Views/BlogPage/components/SmallBlogPost";
import Filter from "Views/BlogPage/components/Filter";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({});
  const context = useContext(UserContext);
  const contextA = useContext(AlertContext);
  const [count, setCount] = useState(0);

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
        contextA.changeMessage("Nie udało się załadować postów");
        contextA.changeVisibility(true);
      }
      setIsLoading(false);
      setCount(res.length);
      setPosts(res);
    };

    loadOffers(context.token);
  }, [context.token, filter]);

  const msg = isLoading ? (
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
