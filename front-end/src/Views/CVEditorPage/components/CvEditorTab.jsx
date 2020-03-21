import React from "react";
import "./CvEditorTab.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const CVEditorTab = ({ title, movie, children, onPrevClick, onNextClick, comments }) => (
    <div>
        <h3>{title}</h3>
        <Form.Group controlId="">
            <img className="CVEditorTab__img" src={movie} alt="" />
        </Form.Group>
        
        {(comments !== "") && <h5>UWAGI:</h5>}
        <h6>{comments}</h6>
        {children}
        <Row>
            <Col>
                <Button
                    className="form_navigation_prev"
                    onClick={e => onPrevClick(e)}
                    disabled={!onPrevClick}
                    block
                >
                    ← Wstecz
                </Button>
            </Col>
            <Col>
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