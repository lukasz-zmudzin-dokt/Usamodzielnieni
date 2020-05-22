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

    const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(data) });

    if (res.status === 201) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const NewContact = ({user, show, setShow, setContacts, alertC}) => {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

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
                let res = await submitContact(data, user.token);
                alertC.showAlert("Pomyślnie dodano kontakt", "success");
                //backend nie zwraca id lol
                console.log(res);
                setContacts({
                    id: res.id,
                    name: name,
                    phone: phone
                });
                setShow(false);
            } catch(e) {
                console.log(e);
                alertC.showAlert("Wystąpił błąd podczas dodawania kontaktu.")
            }
        }
    };

    return (
        <Modal show={show} onHide={e => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Nowy kontakt</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} >
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Dodaj</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
};

export const showNewContactForm = (show, setShow, user, setContacts, alertC) => {
    return (
        <NewContact
            user={user}
            setContacts={setContacts}
            setShow={setShow}
            show={show}
            alertC={alertC}
        />
    )
};