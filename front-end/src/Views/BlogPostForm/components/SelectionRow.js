import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const SelectionRow = ({name}, arrayType, onChange) => {
    let source;
    name === "tags" ? source = {
        selectPlaceholder: "Wybierz tagi z listy",
        formPlaceholder: "Dodaj nowy tag",
    } : source = {
        selectPlaceholder: "Wybierz kategorię z listy",
        formPlaceholder: "Wpisz nową kategorię",
    };

    return (
        <Row className="categories mx-0">
            {console.log(name)}
            {console.log(arrayType)}
            <Col>
                <Form.Control
                    as="select"
                    name={name}
                    onSelect={onChange}
                >
                    <option>{source.selectPlaceholder}</option>
                    {arrayType.length > 0 ?
                        arrayType.map(item => {
                            return <option key={item}>{item}</option>
                        }) : null}
                </Form.Control>
            </Col>
            <div className="mx-0 .col-mx-0 text-center">lub</div>
            <Col>
                <Form.Control
                    name={name}
                    placeholder={source.formPlaceholder}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

export default SelectionRow;