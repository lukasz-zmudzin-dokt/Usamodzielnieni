import React from "react";
import { handleBlur } from "../functions/handlers";
import {Form} from "react-bootstrap";
import "../style.css";

const RenderForms = ({ component }) => {
    return (
        <Form.Group controlId="correctionData">
            <Form.Label>
                <h3 className="correction_title">Dane osobowe</h3>
            </Form.Label>
            <Form.Control
                inline
                as="textarea"
                rows="3"
                placeholder="Wpisz uwagi..."
                defaultValue={component.state.basic_info}
                onBlur={e => handleBlur(component, e, "basic_info")}
                className="cv_correction_textarea personal"
            />
            <Form.Label>
                <h3 className="correction_title">Edukacja</h3>
            </Form.Label>
            <Form.Control
                inline
                as="textarea"
                rows="3"
                placeholder="Wpisz uwagi..."
                defaultValue={component.state.schools}
                onBlur={e => handleBlur(component, e, "schools")}
                className="cv_correction_textarea education"
            />
            <Form.Label>
                <h3 className="correction_title">Doświadczenie zawodowe</h3>
            </Form.Label>
            <Form.Control
                inline
                as="textarea"
                rows="3"
                placeholder="Wpisz uwagi..."
                defaultValue={component.state.experiences}
                onBlur={e => handleBlur(component, e, "experiences")}
                className="cv_correction_textarea experience"
            />
            <Form.Label>
                <h3 className="correction_title">Umiejętności</h3>
            </Form.Label>
            <Form.Control
                inline
                as="textarea"
                rows="3"
                placeholder="Wpisz uwagi..."
                defaultValue={component.state.skills}
                onBlur={e => handleBlur(this, e, "skills")}
                className="cv_correction_textarea personal"
            />
            <Form.Label>
                <h3 className="correction_title">Języki obce</h3>
            </Form.Label>
            <Form.Control
                inline
                as="textarea"
                rows="3"
                placeholder="Wpisz uwagi..."
                defaultValue={component.state.languages}
                onBlur={e => handleBlur(this, e, "languages")}
                className="cv_correction_textarea languages"
            />
            <Form.Label>
                <h3 className="correction_title">Dodatkowe uwagi</h3>
            </Form.Label>
            <Form.Control
                inline
                as="textarea"
                rows="3"
                placeholder="Wpisz uwagi..."
                defaultValue={component.state.additional}
                onBlur={e => handleBlur(this, e, "additional")}
                className="cv_correction_textarea additional"
            />
        </Form.Group>
    );
};

export default RenderForms;