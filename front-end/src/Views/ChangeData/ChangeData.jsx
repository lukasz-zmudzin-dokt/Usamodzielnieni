import React, { useState, useEffect, useContext } from "react";
import { FormGroup } from "components";
import { Form, Card, Button, Container, Row, Alert } from "react-bootstrap";
import { getUserData, sendFixedData } from "./functions/changeData";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "context";
import { FacilityForm, CompanyForm } from "./components";

const ChangeData = () => {
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    facility_name: "",
    facility_address: {
      city: "",
      street: "",
      street_number: "",
      postal_code: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { id } = useParams();
  const user = useContext(UserContext);

  const backToList = () => {
    history.push("/userList");
  };

  //standard b582b042-d6d8-4e57-9447-564a6748b4f7
  //employer fe2c0fca-91a1-437d-846e-7fa6fe6e87ed

  useEffect(() => {
    setLoading(true);
    const getData = async (token, id) => {
      try {
        const res = await getUserData(token, id);
        console.log(res);

        setData(res);
      } catch (err) {}
      setLoading(false);
    };
    getData(user.token, id);
  }, [id, user.token]);

  const { first_name, last_name, phone_number } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendFixedData(user.token, id, data);
    } catch (err) {}
  };

  return (
    <Container>
      <Card>
        <Card.Header as="h2" className="changeData__header">
          <Button
            className="changeData__back"
            onClick={backToList}
            variant="outline-warning"
          >
            {"<"}
          </Button>
          Popraw dane użytkownika:{" "}
        </Card.Header>
        <Card.Body>
          <Form className="changeData__form" onSubmit={(e) => handleSubmit(e)}>
            <div className="changeData__wrapper">
              <Card bg="light" className="changeData__wrapper__card">
                <Card.Header>Dane osobowe</Card.Header>
                <Card.Body>
                  <FormGroup
                    header="Imię"
                    setVal={(val) => setData({ ...data, first_name: val })}
                    val={first_name}
                    length={{ min: 1, max: 30 }}
                    id="firstName"
                  />
                  <FormGroup
                    header="Nazwisko"
                    setVal={(val) => setData({ ...data, last_name: val })}
                    val={last_name}
                    length={{ min: 1, max: 30 }}
                    id="lastName"
                  />
                  <FormGroup
                    header="Numer telefonu"
                    type="tel"
                    setVal={(val) => setData({ ...data, phone_number: val })}
                    val={phone_number}
                    invalid="Podaj numer telefonu w formacie: +48123123123"
                    pattern="[+]{1}[4]{1}[8]{1}[0-9]{3}[0-9]{3}[0-9]{3}"
                    id="phoneNumber"
                  />
                </Card.Body>
              </Card>
              {loading ? (
                <Alert variant="info" className="changeData__loading">
                  Ładowanie...
                </Alert>
              ) : data.nip ? (
                <CompanyForm data={data} setData={setData} />
              ) : (
                <FacilityForm data={data} setData={setData} />
              )}
            </div>
            <Row className="ml-0 mr-0 mt-3 justify-content-center">
              <Button type="submit" variant="primary">
                Prześlij zmiany
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChangeData;
