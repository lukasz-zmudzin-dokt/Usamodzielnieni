import React from "react";
import { Accordion, Form, Button, Card, Col } from "react-bootstrap";
import { FormGroup } from "components";

const Sort = ({ sort, setSort }) => {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <Card.Title className="m-0">Sortowanie</Card.Title>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form.Row>
              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Nazwa oferty"
                id="offer_name--sort"
              />
              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Branża"
                id="category--sort"
              />
              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Województwo"
                id="voivodeship--sort"
              />

              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Nazwa firmy"
                id="company_name--sort"
              />
              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Okres ważności"
                id="expiration_date--sort"
              />
              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Minimalne wynagrodzenie"
                id="salary_min--sort"
              />
              <FormGroup
                as={Col}
                xs={12}
                md={3}
                val={sort}
                setVal={(val) => setSort(val)}
                type="check--sort"
                header="Maksymalne wynagrodzenie"
                id="salary_max--sort"
              />
            </Form.Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Sort;
