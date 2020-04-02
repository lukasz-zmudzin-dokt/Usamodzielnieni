import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./CVEditorTab.css";
import {Form} from "react-bootstrap";

const CVEditorTab = ({ title, movie, children, onPrevClick, onNextClick, comments }) => (
    <div>
        <h3>{title}</h3>
        <Form.Group controlId="">
            <img className="CVEditorTab__img" src={movie} alt="" />
        </Form.Group>
        
        {(comments !== undefined && comments !== "" && comments !== null)? (
        <>
          <h5>Uwagi:</h5>
          <h6>{comments}</h6>
        </>
        ) : null}

        {children}
        <Row>
            <Col xs={12} md={6}>
                <Button
                    className="form_navigation_prev"
                    onClick={e => onPrevClick(e)}
                    disabled={!onPrevClick}
                    block
                >
                    ← Wstecz
                </Button>
            </Col>
            <Col xs={12} md={6}>
                { onNextClick ? (
                <Button
                    className="form_navigation_next"
                    onClick={e => onNextClick(e)}
                    block
                >
                    Dalej →
                </Button>
                ) : (
                <Button
                    variant="success"
                    type="submit"
                    id="saveButton"
                    block
                >
                    Generuj CV
                </Button>
                ) }
            </Col>
        </Row>
    </div>
)

export default CVEditorTab;