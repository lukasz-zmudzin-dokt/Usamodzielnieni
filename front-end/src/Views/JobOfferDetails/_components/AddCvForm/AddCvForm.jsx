import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Button, Alert, Form } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import proxy from "config/api";
import { AlertContext } from "context";

const getCvList = async (token) => {
  let url = proxy.cv + "user/list/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then((res) => mapCvList(res.results));
  } else {
    throw response.status;
  }
};

const mapCvList = (res) =>
  res.map((cv) => ({
    name: cv.name,
    id: cv.cv_id,
    status: cv.is_verified ? "VERIFIED" : "NOT_VERIFIED",
  }));

const sendCv = async (offerId, cvId, token) => {
  let url = `${proxy.job}job-offers/application/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const body = {
    cv: cvId,
    job_offer: offerId,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (response.status === 201 || response.status === 403) {
    return response.status === 201;
  } else {
    throw response.status;
  }
};

const AddCvForm = ({ id, user, ...props }) => {
  const [cvList, setCvList] = useState([]);
  const [isCvListLoading, setIsCvListLoading] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [error, setError] = useState("");
  const alertC = useRef(useContext(AlertContext));

  useEffect(() => {
    const loadCvList = async (token) => {
      setIsCvListLoading(true);
      let loadedCvList;
      try {
        loadedCvList = await getCvList(token);
      } catch (e) {
        console.log(e);
        loadedCvList = [];
        setError("load");
      }
      setCvList(loadedCvList);
      if (loadedCvList.length > 0) {
        setSelectedCv(loadedCvList[0].id);
      }
      setIsCvListLoading(false);
    };
    loadCvList(user.token);
  }, [user.token]);

  const onChange = (e) => {
    const value = e.target.value;
    setSelectedCv(value);
  };

  const onApplyClick = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await sendCv(id, selectedCv, user.token);
    } catch (e) {
      console.log(e);
      alertC.current.showAlert(
        "Wystąpił błąd podczas składania aplikacji na ofertę."
      );
    }
    const newStatus = response ? "ADDED" : "ALREADY_ADDED";
    if (newStatus === "ADDED") {
      alertC.current.showAlert(
        "Pomyślnie zaaplikowano do ogłoszenia.",
        "success"
      );
    } else {
      alertC.current.showAlert("Już zaaplikowano do danego ogłoszenia.");
    }
  };

  const getVerifiedCvs = (cvs) => cvs.filter((cv) => cv.status === "VERIFIED");

  const msg =
    error === "load"
      ? {
          variant: "danger",
          value: "Wystąpił błąd podczas ładowania listy zweryfikowanych CV.",
        }
      : isCvListLoading
      ? { variant: "info", value: "Ładowanie listy zweryfikowanych CV..." }
      : getVerifiedCvs(cvList).length === 0 && {
          variant: "info",
          value: (
            <>
              Poczekaj na pozytywną weryfikację CV lub{" "}
              <IndexLinkContainer to="/cvEditor">
                <Alert.Link>utwórz nowe CV</Alert.Link>
              </IndexLinkContainer>
              .
            </>
          ),
        };

  return msg ? (
    <Alert className="mb-0" variant={msg.variant}>
      {msg.value}
    </Alert>
  ) : (
    <Row>
      <Col lg={{ span: 4, offset: 4 }}>
        <Form onSubmit={onApplyClick}>
          <Form.Group controlId="selectCv">
            <Form.Label>Wybierz CV:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCv}
              onChange={onChange}
              required
            >
              {getVerifiedCvs(cvList).map((cv) => (
                <option key={cv.id} value={cv.id}>
                  {cv.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Row className="mb-0 justify-content-center">
            <Button className="addCvForm__applyButton " type="submit">
              Aplikuj do oferty
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddCvForm;
