import React, { useContext, useEffect, useState, useRef } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { getCVs } from "./functions/getCVs";
import { UserContext, AlertContext } from "context";
import CVList from "./_components/CVList";
import { acceptCV } from "./functions/acceptCV";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "components";

const CVApprovalPage = () => {
  const location = useLocation();
  const context = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [cvs, setCvs] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
  });

  useEffect(() => {
    const loadCVs = async (token) => {
      setLoading(true);
      let res;
      try {
        res = await getCVs(token, filters);
        setCvs(res.results);
        setCount(res.count);
        setLoading(false);
      } catch (e) {
        setCvs([]);
        setLoading(false);
        alertC.current.showAlert("Nie udało się załadować CV.");
      }
    };

    loadCVs(context.token);
  }, [context.token, filters]);

  const cutCV = async (id) => {
    try {
      await acceptCV(context.token, id);
      setCvs(cvs.filter((cv) => cv.cv_id !== id));
    } catch (e) {
      throw false;
    }
  };

  const message = loading ? (
    <Alert variant="info" className="m-3">
      Ładuję...
    </Alert>
  ) : cvs.length === 0 ? (
    <Alert variant="info" className="m-3">
      Brak CV do akceptacji.
    </Alert>
  ) : null;

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  return (
    <Container className="pt-4">
      <Card>
        <Card.Header as="h2">CV do akceptacji</Card.Header>
        <Card.Body className="p-0">
          {message ? (
            message
          ) : (
            <>
              <CVList cvs={cvs} cutCV={cutCV} />
              <Pagination
                current={filters.page}
                max={Math.ceil(count / filters.pageSize)}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CVApprovalPage;
