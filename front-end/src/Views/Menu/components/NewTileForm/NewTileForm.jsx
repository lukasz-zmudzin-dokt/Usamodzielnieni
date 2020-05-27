import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FormGroup from "components/FormGroup";
import { DEFAULT_INPUT } from "constants/other";
import Tile from "../Tile/Tile";
import { AlertContext } from "context/AlertContext";
import { toBase64 } from "utils/converters/fileToBase64";
import CheckBoxList from "./CheckBoxList";
import { approveFileSize } from "utils/approveFile/approveFile";
import proxy from "config/api";
const ColorPicker = React.lazy(() =>
  import("components/ColorPicker/ColorPicker")
);

const fetchPosts = async () => {
  const url = proxy.blog + "blogposts/";
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { headers, method: "GET" });

  if (res.status === 200) {
    return await res.json().then((data) => mapPosts(data.results));
  } else {
    throw res.status;
  }
};

const addTile = async (token, tile, mode, id) => {
  let url = proxy.menu + "tile/";
  url = mode === "PUT" ? url + id + "/" : url;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };
  const res = await fetch(url, {
    method: mode,
    headers,
    body: JSON.stringify(tile),
  });
  const status = mode === "POST" ? 201 : 200;
  if (res.status === status) {
    return await res.json();
  } else {
    throw await res.json();
  }
};

const postPhoto = async (token, id, photo) => {
  const url = proxy.menu + "tile/" + id + "/photo/";
  const headers = {
    Authorization: "Token " + token,
    //"Content-Type": "application/x-www-form-urlencoded"
  };
  const pic = new FormData();
  pic.append("photo", photo, photo.name);

  const res = await fetch(url, { method: "POST", headers, body: pic });

  if (res.status === 200) {
    return;
  } else {
    throw await res.json();
  }
};

const mapPosts = (posts) => {
  return posts.map((item) => ({
    id: "/blog/blogpost/" + item.id,
    name: item.title + " (Kategoria: " + item.category + ")",
  }));
};

const NewTileForm = ({ show, setShow, user, appendTile, tileData }) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#fafafa");
  const [path, setPath] = useState(DEFAULT_INPUT);
  const [photoB64, setPhotoB64] = useState("");
  const [label, setLabel] = useState("");
  const [tileId, setTileId] = useState(undefined);
  const [method, setMethod] = useState("POST");
  const [imgOverFlow, setImgOverflow] = useState({
    left: false,
    top: false,
    right: false,
  });
  const [pathArray, setPathArray] = useState([]);
  const [loading, setLoading] = useState(false);

  let fileInput = useRef(null);
  const alertContext = useRef(useContext(AlertContext));

  useEffect(() => {
    setLoading(true);
    const loadPostList = async () => {
      let res;
      try {
        res = await fetchPosts();
        setPath(res[0].id);
      } catch (e) {
        console.log(e);
        alertContext.current.showAlert(
          "Wystąpił błąd podczas pobierania danych o postach."
        );
        res = [];
      }
      setPathArray(res);
      if (tileData) {
        const { id, title, color, show, imageUrl, destination } = tileData;
        setTileId(id);
        setTitle(title);
        setBackground(color);
        setImgOverflow(show);
        setPhotoB64(imageUrl);
        setPath(destination);
        setMethod("PUT");
        setLabel("Poprzednie zdjęcie");
      }
    };
    loadPostList();
    setLoading(false);
  }, [alertContext, tileData]);

  const onChange = async () => {
    const file = fileInput.current?.files?.[0];
    if (approveFileSize(file)) {
      try {
        const b64 = await toBase64(file);
        setPhotoB64(b64);
        setLabel(file.name);
      } catch (e) {
        alertContext.current.showAlert(
          "Wystąpił błąd podczas wyświetlania wybranego zdjęcia."
        );
      }
    } else {
      alertContext.current.showAlert(
        "Wybrany plik jest za duży. Maksymalna wielkość załącznika to 15 MB."
      );
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
    setImgOverflow({ left: false, top: false, right: false });
    setMethod("POST");
    setTileId(undefined);
    setValidated(false);
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const data = {
        title: title,
        destination: path,
        color: background,
        photo_layer: imgOverFlow,
      };
      try {
        const res = await addTile(user.token, data, method, tileId);
        setTileId(res.id);
        !tileData &&
          (await postPhoto(user.token, res.id, fileInput.current.files[0]));
        alertContext.current.showAlert("Kafelek dodany pomyślnie.", "success");
        appendTile({
          id: res.id || tileId,
          title: title,
          color: background,
          show: imgOverFlow,
          imageUrl: photoB64,
          destination: path,
        });
        clearInput();
      } catch (e) {
        console.log(e);
        alertContext.current.showAlert(Object.values(e)[0]);
      }
    }
  };

  return loading ? (
    <Alert variant="info">Ładowanie...</Alert>
  ) : (
    <Modal
      show={show}
      size="lg"
      onHide={(e) => {
        clearInput();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nowy kafelek</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <FormGroup
            header="Tytuł kafelka"
            setVal={setTitle}
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
            onChange={(v) => setPath(v.target.value)}
            required
          >
            {pathArray.map((val) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </Form.Control>
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
            required={!tileData}
          />
          <Form.Control.Feedback type="invalid">
            Podaj zdjęcie kafelka
          </Form.Control.Feedback>
          <CheckBoxList overlay={imgOverFlow} setOverlay={setImgOverflow} />
          <Row>
            <Col>
              <Form.Label>Kolor kafelka</Form.Label>
              <Suspense fallback={<Alert variant="info">Ładowanie...</Alert>}>
                <ColorPicker
                  background={background}
                  setBackground={setBackground}
                />
              </Suspense>
            </Col>
            <Col>
              <Form.Label>Podgląd</Form.Label>
              <Tile
                title={title}
                color={background}
                destination={""}
                imageUrl={photoB64}
                showImage={imgOverFlow}
                previewOnly={true}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            Dodaj kafelek
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewTileForm;
