import React from 'react';
import {Form} from "react-bootstrap";
import {adminGroup, commonGroup} from "constants/roles";

const TypeSelection = ({isAdmin, selectType}) => (
    <Form.Group className="register_account_type">
        <Form.Label>{isAdmin ? "Nowa rola:" : "Jestem:"}</Form.Label>
        <Form.Control
            data-testid="typeSelector"
            className="register_radio_type"
            as="select"
            onChange={selectType}
        >
            {isAdmin ? adminGroup.map(type => (
                    <option key={type.name} value={type.name}>
                        {type.placeholder}
                    </option>
                )) :
                commonGroup.map(type => (
                    <option key={type.name} value={type.name}>
                        {type.name}
                    </option>
                ))
            }
        </Form.Control>
    </Form.Group>
);


export default TypeSelection;