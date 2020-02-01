import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";

const CVEditorTab = ({ title, movie, children, onPrevClick, onNextClick }) => (
    <div>
        <Form.Group id="complex-cv-fields">
            <Form.Label>
                <h3>{title}</h3>
                <br></br>
                <img className="cv_section_img" src={movie} width="400vw" alt="" />
            </Form.Label>
            {children}
        </Form.Group>
        <ButtonToolbar>
                <Button
                    className="form_navigation_prev"
                    onClick={e => onPrevClick(e)}
                    disabled={!onPrevClick}
                >
                    ← Wstecz
                </Button>
                <Button
                    className="form_navigation_next"
                    onClick={e => onNextClick(e)}
                    disabled={!onNextClick}
                >
                    Dalej →
                </Button>
        </ButtonToolbar>
    </div>
)

export default CVEditorTab;