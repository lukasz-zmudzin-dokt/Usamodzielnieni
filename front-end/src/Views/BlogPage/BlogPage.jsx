import React, { useState, useEffect, useContext, useRef } from "react";
import { AlertContext } from "context";

import { Container, Card, Alert, CardColumns } from "react-bootstrap";
import { getPosts } from "Views/BlogPage/functions/fetchData";
import BlogPost from "Views/BlogPage/components/SmallBlogPost";
import Filter from "Views/BlogPage/components/Filter";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "components";

const BlogPage = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const alertC = useRef(useContext(AlertContext));
  const [count, setCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true);
      let res;
      try {
        res = await getPosts(filters);
      } catch (e) {
        console.log(e);
        res = {
          results: [],
        };
        alertC.current.showAlert("Nie udało się załadować postów");
      }
      setIsLoading(false);
      setCount(res.count);
      setPosts(res.results);
    };

    loadOffers();
  }, [filters]);

  const msg = isLoading ? (
    <Alert variant="info">Ładowanie postów...</Alert>
  ) : (
    count === 0 && (
      <Alert variant="info">Brak postów spełniających podane wymagania.</Alert>
    )
  );

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Blogi</Card.Header>
        <Filter setFilter={setFilters} filtersBlog={filters} count={count} />
        {msg ? (
          <Card.Body>{msg}</Card.Body>
        ) : (
          <CardColumns className="ml-3 mr-3">
            {posts.map((data) => (
              <BlogPost key={data.id} {...data} />
            ))}
          </CardColumns>
        )}
        <Card.Footer className="py-0">
          <Pagination
            current={filters.page}
            max={Math.ceil(count / filters.pageSize)}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BlogPage;
