import React from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";
import {Form} from "react-bootstrap";

const CVEditorTab = ({ title, movie, children, onPrevClick, onNextClick, comments, loading, error, showComments }) => (
    <div>
        <h3>{title}</h3>
        <img className="CVEditorTab__img" src={movie} alt="" />
        
        {(!showComments)? (
            null
        ) : (loading)? (
            <Alert variant="info">
                Wczytuję uwagi...
            </Alert>
            
        ) : (error)? (
            <Alert variant="danger">
                Wystąpił błąd podczas wczytywania uwag do CV.
            </Alert>
        ) : (comments)? (
            <Alert variant="info">
                <Alert.Heading>
                Uwagi:
                </Alert.Heading>
                <p className="mb-0">
                    {comments}
                </p>
            </Alert>
        ) : (
            <Alert variant="success">
                Brak uwag do tej części CV.
            </Alert>
        )
        }

        {children}
        <Row>
            <Col xs={12} md={6}>
                <Button
                    className="mb-3"
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
                    className="mb-3"
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