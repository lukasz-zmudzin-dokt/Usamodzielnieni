import React, { Suspense } from "react";
import { Alert, Card, Container } from "react-bootstrap";
const BlogPostForm = React.lazy(() => import("./BlogpostForm"));

const BlogpostFormContainer = () => {
  return (
    <Container>
      <Card>
        <Suspense
          fallback={
            <Card.Body>
              <Alert variant="info">Ładowanie...</Alert>
            </Card.Body>
          }
        >
          <BlogPostForm />
        </Suspense>
      </Card>
    </Container>
  );
};

export default BlogpostFormContainer;
