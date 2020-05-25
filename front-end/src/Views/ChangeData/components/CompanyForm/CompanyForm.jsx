import React from "react";
import { Card } from "react-bootstrap";
import { FormGroup } from "components";

const CompanyForm = ({ setData, data }) => {
  const { company_address, company_name } = data;
  return (
    <Card bg="light" className="changeData__wrapper__card">
      <Card.Header>Adres firmy</Card.Header>
      <Card.Body>
        <FormGroup
          header="Nazwa firmy"
          setVal={(val) => setData({ ...data, company_name: val })}
          val={company_name}
          length={{ min: 1, max: 100 }}
          id="companyName"
          required
          incorrect="Podaj poprawną nazwę firmy."
        />
        <FormGroup
          header="Ulica"
          required
          setVal={(val) =>
            setData({
              ...data,
              company_address: { ...company_address, street: val },
            })
          }
          val={company_address.street}
          length={{ min: 1, max: 120 }}
          id="streetC"
          incorrect="Podaj poprawną nazwę ulicy."
        />
        <FormGroup
          header="Numer budynku"
          required
          setVal={(val) =>
            setData({
              ...data,
              company_address: {
                ...company_address,
                street_number: val,
              },
            })
          }
          pattern="^([0-9]{1})[\s\S]*"
          val={company_address.street_number}
          length={{ min: 1, max: 20 }}
          id="streetNumberC"
          incorrect="Podaj poprawny numer budynku."
        />
        <FormGroup
          header="Nazwa miasta"
          required
          setVal={(val) =>
            setData({
              ...data,
              company_address: { ...company_address, city: val },
            })
          }
          val={company_address.city}
          length={{ min: 1, max: 40 }}
          id="cityC"
          incorrect="Podaj poprawną nazwę miasta."
        />
        <FormGroup
          header="Kod pocztowy"
          required
          setVal={(val) =>
            setData({
              ...data,
              company_address: {
                ...company_address,
                postal_code: val,
              },
            })
          }
          val={company_address.postal_code}
          length={{ min: 1, max: 6 }}
          pattern="[0-9]{2}[-][0-9]{3}"
          incorrect="Podaj poprawny kod pocztowy."
          id="postalCodeC"
        />
      </Card.Body>
    </Card>
  );
};

export default CompanyForm;

// <Form.Group controlId="formGroupCompanyNip" className="">
//     <Form.Control
//         name="company_nip"
//         type="text"
//         pattern={"[0-9]{9}" + this.getNipControlNum()}
//         placeholder="NIP"
//         onChange={(e) => onChange(onBlur, data, e)}
//         required
//         minLength="10"
//         maxLength="10"
//     />
//     <Form.Control.Feedback type="invalid">
//         Podaj prawidłowy NIP
//             </Form.Control.Feedback>
// </Form.Group>
