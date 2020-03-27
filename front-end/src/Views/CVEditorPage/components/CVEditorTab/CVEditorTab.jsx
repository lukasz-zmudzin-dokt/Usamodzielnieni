import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./CVEditorTab.css";

const CVEditorTab = ({ title, movie, children, onPrevClick, onNextClick }) => (
    <div>
        <h3>{title}</h3>
        <img className="CVEditorTab__img" src={movie} alt="" />
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