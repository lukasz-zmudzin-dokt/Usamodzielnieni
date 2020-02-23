import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

const getCvStatus = async (token) => {
  let url = "https://usamo-back.herokuapp.com/cvStatus/.../";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().status;
  } else {
    throw response.status;
  }
  // TODO
}

const AddCvForm = ({ user, ...props }) => {
  const [cvStatus, setCvStatus] = useState(undefined);
  const [isCvStatusLoading, setIsCvStatusLoading] = useState(false);

  useEffect(() => { loadCvStatus(user.token) }, [user.token]);

  const loadCvStatus = async (token) => {
    setIsCvStatusLoading(true);
    let loadedCvStatus;
    try {
      loadedCvStatus = await getCvStatus(token);
    } catch {
      loadedCvStatus = "accepted"; // TODO: dodanie informacji o błędzie
    }
    setCvStatus(loadedCvStatus);
    setIsCvStatusLoading(false);
  }

  return (
    <Row>
    {isCvStatusLoading ? <Col>Ładowanie...</Col> : (
      <Col>
        {cvStatus === "accepted" ? (
          <Button>
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
    )}
    </Row>
  )
}

export default AddCvForm;