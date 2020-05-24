import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useContext, useRef, useState} from "react";
import FormGroup from "components/FormGroup";
import {DEFAULT_INPUT} from "constants/other";
import { SketchPicker } from 'react-color';
import Tile from "../Tile/Tile";
import {AlertContext} from "context/AlertContext";
import {toBase64} from "utils/converters/fileToBase64";
import CheckBoxList from "./CheckBoxList";

const NewTileForm = ({show, setShow, user}) => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [background, setBackground] = useState("#fafafa");
    const [path, setPath] = useState(DEFAULT_INPUT);
    const [photoB64, setPhotoB64] = useState("");
    const [label, setLabel] = useState("");
    const [imgOverFlow, setImgOverflow] = useState({
        left: false, top: false, right: false
    });
    const [pathArray, setPathArray] = useState([]);

    const fileInput = useRef(null);
    const alertContext = useContext(AlertContext);

    const onChange = async () => {
        const file = fileInput.current?.files?.[0];
        // zapakować w 15mb!!
        try {
            const b64 = await toBase64(file);
            setPhotoB64(b64);
            setLabel(file.name);
        } catch(e) {
            alertContext.showAlert("Wystąpił błąd podczas wyświetlania zdjęcia.");
        }
    };

    const clearInput = () => {
        setTitle("");
        setBackground("#fafafa");
        setPath("");
        setValidated(false);
        setLabel("");
        setPhotoB64("");
        setImgOverflow({left: false, top: false, right: false});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("poszło albo i nie")
    }

    return (
        <Modal show={show} size="lg" onHide={e => {clearInput(); setShow(false)}}>
            <Modal.Header closeButton>
                <Modal.Title >Nowy kafelek</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormGroup
                        header="Tytuł kafelka"
                        setVal={v => setTitle(v)}
                        id="title"
                        val={title}
                        incorrect="Tytuł kafelka nie może być pusty"
                        required
                    />
                    <FormGroup
                        type="select"
                        header="Ścieżka od kafelka"
                        val={path}
                        setVal={setPath}
                        array={pathArray}
                        id="path"
                    />
                    <Form.Label>Zdjęcie kafelka</Form.Label>
                    <Form.File
                        className="text-nowrap text-truncate"
                        id="custom-file"
                        ref={fileInput}
                        custom
                        onChange={onChange}
                        label={label || "Dodaj zdjęcie..."}
                        accept="image/*"
                        data-browse="Wybierz plik"
                        required
                    />
                    <CheckBoxList overlay={imgOverFlow} setOverlay={setImgOverflow} />
                    <Row>
                        <Col>
                            <Form.Label>Kolor kafelka</Form.Label>
                            <SketchPicker
                                disableAlpha
                                style={{width: "100%"}}
                                color={background}
                                onChangeComplete={color => setBackground(color.hex)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Podgląd</Form.Label>
                            <Tile
                                title={title}
                                color={background}
                                destination={undefined}
                                imageUrl={photoB64}
                                showImage={imgOverFlow}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">Dodaj kafelek</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
};

export default NewTileForm;