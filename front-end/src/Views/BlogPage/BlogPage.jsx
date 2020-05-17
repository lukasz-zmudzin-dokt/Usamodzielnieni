import React, { useState, useEffect, useContext,useRef} from "react";
import { AlertContext } from "context";

import { Container, Card, Alert, CardColumns } from "react-bootstrap";
import { getPosts } from "Views/BlogPage/functions/fetchData";
import BlogPost from "Views/BlogPage/components/SmallBlogPost";
import Filter from "Views/BlogPage/components/Filter";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({});
  const alertC = useRef(useContext(AlertContext));
  const [count, setCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true);
      let res;
      try {
        res = await getPosts(filter);
      } catch (e) {
        console.log(e);
        res = [];
        alertC.current.showAlert("Nie udało się załadować postów");
      }
      setIsLoading(false);
      setCount(res.length);
      setPosts(res);
    };

    loadOffers();
  }, [filter]);

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
        <Filter setFilter={setFilter} count={count} />
        {msg ? (
          <Card.Body>msg</Card.Body>
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
