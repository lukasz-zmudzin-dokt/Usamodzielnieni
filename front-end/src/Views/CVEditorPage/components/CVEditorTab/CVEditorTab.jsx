import React from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";
import "./CVEditorTab.css";
import {Form} from "react-bootstrap";

const CVEditorTab = ({ title, movie, children, onPrevClick, onNextClick, comments }) => (
    <div>
        <h3>{title}</h3>
        <img className="CVEditorTab__img" src={movie} alt="" />
        
        {(comments)? (
        <Alert variant="info">
            <Alert.Heading>
              Uwagi:
            </Alert.Heading>
            <p>
                {comments}
            </p>
        </Alert>
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