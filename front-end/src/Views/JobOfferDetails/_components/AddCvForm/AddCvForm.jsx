import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

const getCvStatus = async (token) => {
  let url = "https://usamo-back.herokuapp.com/cv/status/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then(res => mapCvStatus(res));
  } else {
    throw response.status;
  }
}

const mapCvStatus = (res) => res.is_verified ? 'VERIFIED' : 'NOT_VERIFIED';

const sendCv = async (id, token) => {
  let url = `https://usamo-back.herokuapp.com/job/offer-interested/${id}`;
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
  const [cvStatus, setCvStatus] = useState(undefined);
  const [isCvStatusLoading, setIsCvStatusLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCvStatus = async (token) => {
      setIsCvStatusLoading(true);
      let loadedCvStatus;
      try {
        loadedCvStatus = await getCvStatus(token);
      } catch (e) {
        console.log(e);
        loadedCvStatus = undefined;
        setError(true);
      }
      setCvStatus(loadedCvStatus);
      setIsCvStatusLoading(false);
    }
    loadCvStatus(user.token)
  }, [user.token]);

  const onApplyClick = async () => {
    let response;
    try {
      response = await sendCv(id, user.token);
    } catch (e) {
      console.log(e);
      setError(true);
    }
    const newStatus = response ? 'ADDED' : 'ALREADY_ADDED';
    setCvStatus(newStatus);
  }

  const msg = error ? { variant: "danger", value: "Wystąpił błąd podczas ładowania statusu CV." }:
              isCvStatusLoading ? { variant: "info", value: "Ładowanie statusu CV..." }:
              cvStatus === 'ADDED' ? { variant: "success", value: "Pomyślnie zaaplikowano do ogłoszenia." }:
              cvStatus === 'ALREADY_ADDED' && { variant: "danger", value: "Już zaaplikowano do danego ogłoszenia." };

  return msg ? <Alert className="mb-0" variant={msg.variant}>{msg.value}</Alert> : (
    <Row>
      <Col>
        {cvStatus === "VERIFIED" ? (
          <Button onClick={onApplyClick}>
            Aplikuj
          </Button>
        ) : (
          <IndexLinkContainer to={`/cvEditor/`}>
            <Button>
              Utwórz CV
            </Button>
          </IndexLinkContainer>
        )}
      </Col>
    </Row>
  )
}

export default AddCvForm;