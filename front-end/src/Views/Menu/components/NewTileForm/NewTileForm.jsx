import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useContext, useEffect, useRef, useState} from "react";
import FormGroup from "components/FormGroup";
import {DEFAULT_INPUT} from "constants/other";
import { SketchPicker } from 'react-color';
import Tile from "../Tile/Tile";
import {AlertContext} from "context/AlertContext";
import {toBase64} from "utils/converters/fileToBase64";
import CheckBoxList from "./CheckBoxList";
import {approveFileSize} from "utils/approveFile/approveFile";

const fetchPosts = async () => {
    const url = proxy.blog + "blogposts/";
    const headers = {
        "Content-Type": "application/json"
    };

    const res = await fetch(url, {headers, method: "GET"});

    if (res.status === 200) {
        return await res.json().then(data => mapPosts(data.results))
    } else {
        throw res.status;
    }
};

const mapPosts = (posts) => {
    return posts.map(item => ({
       id: item.id,
       category: item.category,
       title: item.title
    }));
};

const NewTileForm = ({show, setShow, user, appendTile}) => {
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
    const [loading, setLoading] = useState(false);

    let fileInput = useRef(null);
    const alertContext = useContext(AlertContext);

    useEffect(() => {
        setLoading(true);
        const loadPostList = async () => {
            let res;
            try {
                res = await fetchPosts();
            } catch(e) {
                console.log(e);
                alertContext.showAlert("Wystąpił błąd podczas pobierania danych o postach.");
                res = [];
            }
            setPathArray(res);
        };
        loadPostList();
        setLoading(false);
    }, [alertContext]);

    const onChange = async () => {
        const file = fileInput.current?.files?.[0];
        if (approveFileSize(file)) {
            try {
                const b64 = await toBase64(file);
                setPhotoB64(b64);
                setLabel(file.name);
            } catch(e) {
                alertContext.showAlert("Wystąpił błąd podczas wyświetlania zdjęcia.");
            }
        } else {
            alertContext.showAlert("Wybrany plik jest za duży. Maksymalna wielkość załącznika to 15 MB.");
            fileInput = null;
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
    };

    return loading ? <Alert variant="info">Ładowanie...</Alert> : (
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
                    <Form.Label>Ścieżka do kafelka</Form.Label>
                    <Form.Control
                        as="select"
                        value={path}
                        id="path"
                        onChange={setPath}
                        required
                    >
                        {pathArray.map((val) => (
                            <option key={val.id} value={val.id}>
                                {val.title} (Kategoria: {val.category})
                            </option>
                        ))}
                    </Form.Control>
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