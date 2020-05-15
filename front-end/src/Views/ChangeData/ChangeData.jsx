import React, { useState, useEffect, useContext } from "react";
import { FormGroup } from "components";
import { Form, Card, Button, Container, Row } from "react-bootstrap";
import { getUserData } from "./functions/changeData";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "context";

const ChangeData = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    facilityName: "",
    facilityAddress: {
      city: "",
      street: "",
      streetNumber: "",
      postalCode: "",
    },
  });

  const history = useHistory();
  const { id } = useParams();
  const user = useContext(UserContext);

  const backToList = () => {
    history.push("/userList");
  };

  const mapDetails = (object) => {
    return {
      username: object.username,
      email: object.email,
      firstName: object.first_name,
      lastName: object.last_name,
      phoneNumber: object.phone_number,
      facilityAddress: object.facility_address,
      ...object,
    };
  };

  useEffect(() => {
    const getData = async (token, id) => {
      try {
        const res = await getUserData(token, id);
        const mappedRes = mapDetails(res);
        setData(mappedRes);
      } catch (err) {}
    };
    getData(user.token, id);
  }, [id, user.token]);

  const {
    firstName,
    lastName,
    phoneNumber,
    facilityAddress,
    facilityName,
  } = data;

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
          <Form className="changeData__form">
            <div className="changeData__wrapper">
              <Card bg="light" className="changeData__wrapper__card">
                <Card.Header>Dane osobowe</Card.Header>
                <Card.Body>
                  <FormGroup
                    header="Imię"
                    setVal={(val) => setData({ ...data, firstName: val })}
                    val={firstName}
                    length={{ min: 1, max: 30 }}
                    id="firstName"
                  />
                  <FormGroup
                    header="Nazwisko"
                    setVal={(val) => setData({ ...data, lastName: val })}
                    val={lastName}
                    length={{ min: 1, max: 30 }}
                    id="lastName"
                  />
                  <FormGroup
                    header="Numer telefonu"
                    type="tel"
                    setVal={(val) => setData({ ...data, phoneNumber: val })}
                    val={phoneNumber}
                    invalid="Podaj numer telefonu w formacie: +48123123123"
                    pattern="[+]{1}[4]{1}[8]{1}[0-9]{3}[0-9]{3}[0-9]{3}"
                    id="phoneNumber"
                  />
                </Card.Body>
              </Card>
              <Card bg="light" className="changeData__wrapper__card">
                <Card.Header>Adres placówki</Card.Header>
                <Card.Body>
                  <FormGroup
                    header="Nazwa placówki"
                    setVal={(val) => setData({ ...data, facilityName: val })}
                    val={facilityName}
                    length={{ min: 1, max: 100 }}
                    id="facilityName"
                  />
                  <FormGroup
                    header="Ulica"
                    setVal={(val) =>
                      setData({
                        ...data,
                        facilityAddress: { street: val, ...facilityAddress },
                      })
                    }
                    val={facilityAddress.street}
                    length={{ min: 1, max: 120 }}
                    id="street"
                  />
                  <FormGroup
                    header="Numer budynku"
                    setVal={(val) =>
                      setData({
                        ...data,
                        facilityAddress: {
                          streetNumber: val,
                          ...facilityAddress,
                        },
                      })
                    }
                    val={facilityAddress.streetNumber}
                    length={{ min: 1, max: 20 }}
                    id="streetNumber"
                  />
                  <FormGroup
                    header="Nazwa miasta"
                    setVal={(val) =>
                      setData({
                        ...data,
                        facilityAddress: { city: val, ...facilityAddress },
                      })
                    }
                    val={facilityAddress.city}
                    length={{ min: 1, max: 40 }}
                    id="city"
                  />
                  <FormGroup
                    header="Kod pocztowy"
                    setVal={(val) =>
                      setData({
                        ...data,
                        facilityAddress: {
                          postalCode: val,
                          ...facilityAddress,
                        },
                      })
                    }
                    val={facilityAddress.postalCode}
                    length={{ min: 1, max: 6 }}
                    pattern="[0-9]{2}[-][0-9]{3}"
                    id="postalCode"
                  />
                </Card.Body>
              </Card>
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
