import React from "react";
import { Card } from "react-bootstrap";
import { FormGroup } from "components";

const FacilityForm = ({ setData, data }) => {
  const { facility_address, facility_name } = data;
  return (
    <Card bg="light" className="changeData__wrapper__card">
      <Card.Header>Adres placówki</Card.Header>
      <Card.Body>
        <FormGroup
          header="Nazwa placówki"
          setVal={(val) => setData({ ...data, facility_name: val })}
          val={facility_name}
          length={{ min: 1, max: 100 }}
          id="facilityName"
          required
          incorrect="Podaj poprawną nazwę placówki."
        />
        <FormGroup
          header="Ulica"
          setVal={(val) =>
            setData({
              ...data,
              facility_address: { ...facility_address, street: val },
            })
          }
          val={facility_address.street}
          length={{ min: 1, max: 120 }}
          id="street"
          required
          incorrect="Podaj poprawną nazwę ulicy."
        />
        <FormGroup
          header="Numer budynku"
          setVal={(val) =>
            setData({
              ...data,
              facility_address: {
                ...facility_address,
                street_number: val,
              },
            })
          }
          val={facility_address.street_number}
          length={{ min: 1, max: 20 }}
          id="streetNumber"
          required
          pattern="^([0-9]{1})[\s\S]*"
          incorrect="Podaj poprawny numer budynku."
        />
        <FormGroup
          header="Nazwa miasta"
          setVal={(val) =>
            setData({
              ...data,
              facility_address: { ...facility_address, city: val },
            })
          }
          val={facility_address.city}
          length={{ min: 1, max: 40 }}
          id="city"
          required
          incorrect="Podaj poprawną nazwę miasta."
        />
        <FormGroup
          header="Kod pocztowy"
          setVal={(val) =>
            setData({
              ...data,
              facility_address: {
                ...facility_address,
                postal_code: val,
              },
            })
          }
          required
          val={facility_address.postal_code}
          pattern="[0-9]{2}[-][0-9]{3}"
          id="postalCode"
          incorrect="Podaj poprawny kod pocztowy w formacie 00-000."
        />
      </Card.Body>
    </Card>
  );
};

export default FacilityForm;
