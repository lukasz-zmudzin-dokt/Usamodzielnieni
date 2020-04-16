import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";

const TypeSelection = ({isAdmin, selectType}) => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        if (isAdmin) {
            setArray(['Weryfikacja użytkowników', 'Weryfikacja CV', 'Weryfikacja ofert pracy', 'Kreator postów na blogu', 'Moderator bloga']);
        } else {
            setArray(['Podopiecznym', 'Pracodawcą']);
        }
    }, [isAdmin]);

    return (
        <Form.Group className="register_account_type">
            <Form.Label>{isAdmin ? "Nowa rola:" : "Jestem:"}</Form.Label>
            <Form.Control
                data-testid="typeSelector"
                className="register_radio_type"
                as="select"
                onChange={selectType}
            >
                {array.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    )
};

export default TypeSelection;