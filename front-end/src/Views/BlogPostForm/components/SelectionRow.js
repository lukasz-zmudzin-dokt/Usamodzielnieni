import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import ButtonList from "./ButtonList";

const SelectionRow = ({name, arrayType, onChange, current, onCut}) => {
    let source;
    name === "tags" ? source = {
        selectPlaceholder: "Wybierz tagi z listy",
        formPlaceholder: "Dodaj nowy tag",
    } : source = {
        selectPlaceholder: "Wybierz kategorię z listy",
        formPlaceholder: "Wpisz nową kategorię",
    };

    return (
       <div>
            <Row className="categories mx-0">
                {console.log(arrayType)}
                <Col>
                    <Form.Control
                        as="select"
                        name={name}
                        onChange={onChange}
                    >
                        <option>{source.selectPlaceholder}</option>
                        {arrayType.length > 0 ?
                            arrayType.map(item =>
                                (<option key={item} value={item}>{item}</option>)
                            ) : null}
                    </Form.Control>
                </Col>
                <div className="mx-0 .col-mx-0 text-center">lub</div>
                <Col>
                    <Form.Control
                        name={name}
                        placeholder={source.formPlaceholder}
                        onBlur={onChange}
                    />
                </Col>
            </Row>
           <div>
               {name === "tags" ?
                    <ButtonList array={current} cutItem={onCut} /> :
                    <p className="mx-3 mt-2 text-muted">Kategoria: {current !== "" ? current : "nie wybrano"}</p>
               }
           </div>
       </div>
    );
};

export default SelectionRow;