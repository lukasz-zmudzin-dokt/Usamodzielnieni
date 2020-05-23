import {Button, Form, Modal} from "react-bootstrap";
import React, {useContext, useRef, useState} from "react";
import FormGroup from "components/FormGroup";
import proxy from "config/api";
import {AlertContext} from "context/AlertContext";

const updatePassword = async (token, data) => {
    const url = proxy.account + "data/password_change/";
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const res = await fetch(url, {method: "PUT", headers, body: JSON.stringify(data)});

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const PasswordChangeModal = ({user, show, setShow}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordR, setNewPasswordR] = useState("");
    const alertC = useRef(useContext(AlertContext));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false || newPassword !== newPasswordR) {
            event.stopPropagation();
        } else {
            try {
                const data = {
                    old_password: oldPassword,
                    new_password: newPassword
                };
                await updatePassword(user.token, data);
                alertC.current.showAlert("Hasło zostało zmienione.", "success");
                setShow(false);
            } catch(e) {
                console.log(e);
                if (e === 403) {
                    alertC.current.showAlert("Podano błędne poprzednie hasło.");
                } else {
                    alertC.current.showAlert("Wystąpił błąd podczas zmiany hasła.");
                }
            }
        }
    };

    return (
        <Modal show={show} onHide={e => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Zmiana hasła</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormGroup
                        header="Poprzednie hasło"
                        type="password"
                        setVal={setOldPassword}
                        id="oldPassword"
                        val={oldPassword}
                        required
                        incorrect="To pole jest wymagane."
                        length={{min: 8, max: 120}}
                    />
                    <FormGroup
                        header="Nowe hasło (min. 8 znaków)"
                        setVal={setNewPassword}
                        type="password"
                        id="newPassword"
                        val={newPassword}
                        required
                        incorrect="Hasła muszą się zgadzać."
                        length={{min: 8, max: 120}}
                    />
                    <FormGroup
                        header="Powtórz nowe hasło"
                        setVal={setNewPasswordR}
                        id="newPasswordR"
                        type="password"
                        val={newPasswordR}
                        required
                        incorrect="Hasła muszą się zgadzać."
                        length={{min: 8, max: 120}}
                    />
                    <div>
                        Nowe hasło powinno zawierać przynajmniej jedną cyfrę, jedną wielką literę i jeden znak specjalny (&, @, ?, ...).
                        Hasło nie może być ciągiem samych cyfr.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">Zmień hasło</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
};

export default PasswordChangeModal;