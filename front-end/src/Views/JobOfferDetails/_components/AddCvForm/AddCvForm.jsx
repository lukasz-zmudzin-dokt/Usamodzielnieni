import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Alert, Form } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import "./AddCvForm.css";

const getCvList = async (token) => {
  let url = "https://usamo-back.herokuapp.com/cv/user/list/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then(res => mapCvList(res));
  } else {
    throw response.status;
  }
}

const mapCvList = (res) => res.map(cv => ({
  id: cv.cv_id,
  status: cv.is_verified ? 'VERIFIED' : 'NOT_VERIFIED'
}));

const sendCv = async (offerId, cvId, token) => {
  let url = `https://usamo-back.herokuapp.com/job/offer-interested/${offerId}/`; // ${cvId}
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "POST", headers });

  if (response.status === 200 || response.status === 400) {
    return response.status === 200;
  } else {
    throw response.status;
  }
}

const AddCvForm = ({ id, user, ...props }) => {
  const [cvList, setCvList] = useState([]);
  const [isCvListLoading, setIsCvListLoading] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCvList = async (token) => {
      setIsCvListLoading(true);
      let loadedCvList;
      try {
        loadedCvList = await getCvList(token);
      } catch (e) {
        console.log(e);
        loadedCvList = [];
        setError(true);
      }
      setCvList(loadedCvList);
      if (loadedCvList.length > 0) setSelectedCv(loadedCvList[0].id);
      setIsCvListLoading(false);
    }
    loadCvList(user.token)
  }, [user.token]);

  const onApplyClick = async (e) => {
    e.preventDefault()
    let response;
    try {
      response = await sendCv(id, selectedCv, user.token);
    } catch (e) {
      console.log(e);
      setError(true);
    }
    const newStatus = response ? 'ADDED' : 'ALREADY_ADDED';
    setCvList(cvList.map(cv => {
      if (cv.id === selectedCv) {
        cv.status = newStatus;
      }
      return cv;
    }));
  }

  const getVerifiedCvs = (cvs) => cvs.filter(cv => cv.status === 'VERIFIED')

  const msg = error ? { variant: "danger", value: "Wystąpił błąd podczas ładowania listy zweryfikowanych CV." } :
              isCvListLoading ? { variant: "info", value: "Ładowanie listy zweryfikowanych CV..." } :
              cvList.find(cv => cv.status === 'ADDED') ? { variant: "success", value: "Pomyślnie zaaplikowano do ogłoszenia." } :
              cvList.find(cv => cv.status === 'ALREADY_ADDED') ? { variant: "danger", value: "Już zaaplikowano do danego ogłoszenia." } :
              getVerifiedCvs(cvList).length === 0 && { variant: "info", value: (
                <>
                  Poczekaj na pozytywną weryfikację CV lub <IndexLinkContainer to="/cvEditor"><Alert.Link>utwórz nowe CV</Alert.Link></IndexLinkContainer>.
                </>
              ) }

  return msg ? <Alert className="mb-0" variant={msg.variant}>{msg.value}</Alert> : (
    <Row>
      <Col lg={{ span: 4, offset: 4 }}>
        <Form onSubmit={onApplyClick}>
          <Form.Group controlId="selectCv">
            <Form.Label>Wybierz CV:</Form.Label>
            <Form.Control
              as="select" 
              value={selectedCv}
              onChange={e => setSelectedCv(e.target.value)}
              required>
              {getVerifiedCvs(cvList).map((cv, i) => <option key={cv.id} value={cv.id}>Wersja {i+1}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group className="addCvForm__applyGroup mb-0">
            <Button className="addCvForm__applyButton" type="submit">
              Aplikuj do oferty
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

export default AddCvForm;