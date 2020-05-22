import React, {useContext, useRef, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FormGroup} from "components";
import Form from "react-bootstrap/Form";
import proxy from "config/api";
import {AlertContext} from "context/AlertContext";

const submitContact = async (data, token) => {
    const url = proxy.contact + "contact/";
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const res = await fetch(url, { method: "POST", headers });

    if (res.status === 201) {
        return res.status;
    } else {
        throw res.status;
    }
};

const NewContact = ({user, show, setShow, setContacts}) => {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const alertC = useRef(useContext(AlertContext));

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const data = {
                title: name,
                phone_number: phone
            };
            try {
                await submitContact(data, user.token);
                alertC.current.showAlert("Pomyślnie dodano kontakt");
                setContacts(data);
                setShow(false);
            } catch(e) {
                console.log(e);
                alertC.current.showAlert("Wystąpił błąd podczas dodawania kontaktu.")
            }
        }
    };

    return (
        <Modal show={show} onHide={setShow(false)}>
            <Modal.Header>
                <Modal.Title>Nowy kontakt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <FormGroup
                        header="Nazwa kontaktu"
                        setVal={setName}
                        id="name"
                        val={name}
                        required
                        incorrect="Podaj nazwę kontaktu"
                        length={{ min: 1, max: 120 }}
                    />
                    <FormGroup
                        header="Numer telefonu"
                        setVal={setPhone}
                        id="name"
                        val={phone}
                        required
                        incorrect="Podaj telefon kontaktowy"
                        length={{ min: 1, max: 120 }}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">Dodaj</Button>
            </Modal.Footer>
        </Modal>
    )
};