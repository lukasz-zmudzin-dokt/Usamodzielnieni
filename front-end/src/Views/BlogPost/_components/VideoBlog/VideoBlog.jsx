import React, {useState} from "react";
import {Button, Card, CardDeck, Form, Modal} from "react-bootstrap";
import VideoCard from "../VideoCard/VideoCard";
import {FormGroup} from "components";
import {staffTypes} from "constants/staffTypes";

const approveChanges = async (id, token, data) => {
    const url = proxy.blog + "blogpost/" + id + "/";
    const headers = {
        Authorization: "Token " + token,
        "Content-type": "application/json"
    };

    const res = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
    });

    if (res.status === 200) {
        return;
    } else {
        throw await res.json();
    }
};

const VideoBlog = ({user, post, setPost, alertC}) => {
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({
        url: "",
        description: ""
    });

    const cutItem = async (id) => {
        const newContent = post.content.filter((item) => item.id !== id);
        await updateBlog(newContent);
    };

    const appendItem = async (data) => {
        const newContent = post.content.append({id: data.description + data.url, ...data});
        await updateBlog(newContent);
    };

    const updateBlog = async (newContent) => {
        try {
            const data = { ...post, content:  newContent};
            await approveChanges(post.id, user?.token, data);
            clearData();
            setPost({...post, content: newContent});
            alertC.current.showAlert("Karta została pomyślnie dodana.", "success");
        } catch(e) {
            alertC.current.showAlert(Object.values(e)[0]);
        }
    };

    const clearData = () => {
        setValidated(false);
        setShowModal(false);
        setData({url: "", description: ""});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await appendItem();
        }
    };

    return (
        <Card>
            {
                post.header !== null && (
                    <Card.Img
                        variant="top"
                        src={`${proxy.plain}${post.header}`}
                        alt="Nagłówek posta"
                    />
                )
            }
            <Card.Body>
                <Card.Title>
                    {post.title}
                </Card.Title>
                {
                    user?.data?.group_type?.includes(staffTypes.BLOG_CREATOR) && (
                        <Button variant="primary" onClick={e => setShowModal(true)}>Dodaj kartę</Button>
                    )
                }
                <CardDeck>
                    {post.content !== "początek" && post.content.map(item => (
                        <VideoCard
                            key={item.id}
                            content={item}
                            cutCard={cutItem}
                            user={user}
                        />
                    ))}
                </CardDeck>
            </Card.Body>
            <Modal show={showModal} onHide={e => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nowa karta wideo</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <FormGroup
                            header="URL do filmu"
                            setVal={val => setData({...data, url: val})}
                            id="url"
                            val={data.url}
                            required
                            incorrect="To pole jest wymagane"
                        />
                        <FormGroup
                            header="Opis"
                            setVal={val => setData({...data, description: val})}
                            val={data.description}
                            id="description"
                            required
                            type="textarea"
                            incorrect="To pole jest wymagane"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Dodaj kartę
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Card>
    )
};

export default VideoBlog;