import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Card, CardColumns, Form, Modal } from "react-bootstrap";
import VideoCard from "../VideoCard/VideoCard";
import { FormGroup } from "components";
import { staffTypes } from "constants/staffTypes";
import proxy from "config/api";
import { AlertContext } from "context/AlertContext";
import { deletePost } from "Views/BlogPost/functions/apiCalls";
import { DeletionModal } from "components";

const approveChanges = async (id, token, data) => {
  const url = proxy.blog + "blogpost/" + id + "/";
  const headers = {
    Authorization: "Token " + token,
    "Content-type": "application/json",
  };

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data), //lol to działa xDD
  });

  if (res.status === 200) {
    return;
  } else {
    throw res.status;
  }
};

const VideoBlog = ({ user, postString, setDel }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState({
    url: "",
    description: "",
  });
  const [content, setContent] = useState(JSON.parse(postString.content));
  const alertC = useRef(useContext(AlertContext));

  const cutItem = async (id) => {
    let tmp = content.filter((item) => item.id !== id);
    await updateBlog(tmp);
  };

  const appendItem = async (data) => {
    let newContent = content;
    newContent.push({ id: data.description + data.url, ...data });
    await updateBlog(newContent);
  };

  const updateBlog = async (newContent) => {
    try {
      const obj = { ...postString, content: JSON.stringify(newContent) };
      await approveChanges(postString.id, user?.token, obj);
      clearData();
      setContent(newContent);
      //setPost(obj);
      clearData();
      alertC.current.showAlert(
        "Zmiany zostały pomyślnie wprowadzone.",
        "success"
      );
    } catch (e) {
      alertC.current.showAlert("Wystąpił błąd podczas dodawania nowej karty");
    }
  };

  const clearData = () => {
    setValidated(false);
    setShowModal(false);
    setData({ url: "", description: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await appendItem(data);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postString.id, user.token);
      setDeleted(true);
      setDel(true);
    } catch (e) {
      alertC.current.showAlert("Wystąpił błąd podczas usuwania wideobloga.");
    }
  };

  return (
    <Card>
      {postString.header !== null && (
        <Card.Img
          variant="top"
          src={`${proxy.plain}${postString.header}`}
          alt="Nagłówek posta"
        />
      )}
      <Card.Body>
        {deleted && <Alert variant="info">Ten blog został usunięty</Alert>}
        <Card.Title as="h2" className="mb-4">
          {postString.title}
          {!deleted &&
            user?.data?.group_type?.includes(staffTypes.BLOG_CREATOR) && (
              <>
                <Button
                  variant="primary"
                  className="mx-3"
                  onClick={(e) => setShowModal(true)}
                >
                  Dodaj wideo
                </Button>
                <Button
                  variant="danger"
                  className="mx-3"
                  onClick={() => setShowDelModal(true)}
                >
                  Usuń wideobloga
                </Button>
              </>
            )}
        </Card.Title>
        <CardColumns>
          {content.map((item) => (
            <VideoCard
              key={item.id}
              content={item}
              cutCard={cutItem}
              user={user}
            />
          ))}
        </CardColumns>
      </Card.Body>
      <Modal show={showModal} onHide={(e) => clearData()}>
        <Modal.Header closeButton>
          <Modal.Title>Nowa karta wideo</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FormGroup
              header="URL do filmu"
              setVal={(val) => setData({ ...data, url: val })}
              id="url"
              val={data.url}
              required
              incorrect="To pole jest wymagane"
            />
            <FormGroup
              header="Opis"
              setVal={(val) => setData({ ...data, description: val })}
              val={data.description}
              id="description"
              required
              type="textarea"
              length={{ min: 1, max: 500 }}
              incorrect="To pole jest wymagane"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Zatwierdź kartę
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <DeletionModal
        show={showDelModal}
        setShow={setShowDelModal}
        question="Czy na pewno chcesz usunąć tego wideobloga?"
        delConfirmed={handleDelete}
      />
    </Card>
  );
};

export default VideoBlog;
