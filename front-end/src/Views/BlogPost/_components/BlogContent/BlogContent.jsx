import React, {useState} from 'react'
import {Alert, Badge, Button, ButtonToolbar, Card, Col, Row} from "react-bootstrap";
import mediumDraftImporter from 'medium-draft/lib/importer';
import {convertToHTML} from "draft-convert";
import {deletePost} from "../../functions/apiCalls";
import {Redirect} from "react-router-dom";

const getDateString = dateString => {
    return dateString.substring(0,2) + "." + dateString.substring(3, 5) + "." + dateString.substring(6, 10);
};

const renderTags = tagList => {
    if (tagList.length === 0) {
        return "Brak tagów.";
    }
    else return tagList.map(tag => {
        return <Badge variant="info" key={tag} className="mx-1">{tag}</Badge>
    });
};

const handleDeletion = async (event, id, token, errorFlag, successFlag) => {
    event.preventDefault();
    try {
        await deletePost(id, token);
        successFlag(true);
    } catch(e) {
        console.log(e);
        errorFlag(true);
    }
};

const renderButtons = (id, user, author, errorFlag, successFlag, editionFlag, flag) => {
    console.log(author.email)
    console.log(user.data.email)
    if ( (user.type === 'Staff' || user.data.email === author.email) && !flag) {
        return (
            <ButtonToolbar className="btn_toolbar text-center">
                <Button variant="warning" className="button-edit mx-3" onClick={e => editionFlag(true)}>Edytuj 🖉</Button>
                <Button variant="danger" className="button-delete mx-3" onClick={e => handleDeletion(e, id, user.token, errorFlag, successFlag)}>Usuń ✗</Button>
            </ButtonToolbar>
        )
    }
};

const renderRedirect = (flag, id) => {
    const path = `/blog/newPost/${id}`;
    if (flag)
        return <Redirect to={path}/>;
};

const BlogContent = ({ post , user }) => {
    const [delError, setDelError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [wantsEdition, setWantsEdition] = useState(false);
    if (post === undefined)
        return <Alert variant="danger" className="d-lg-block">Wystąpił błąd podczas ładowania zawartości bloga.</Alert>;
    const {firstName, lastName, email} = post.author;
    const content = convertToHTML(mediumDraftImporter(post.content));
    return (
        <Card>
            {post.header !== null && post.header !== "" ?
                <Card.Img variant="top" src={`https://usamo-back.herokuapp.com${post.header}`}/> : <Card.Header/>
            }
            <Card.Body className="post_content mx-4">
                {
                    delError ? <Alert variant="danger">Wystąpił błąd podczas usuwania posta.</Alert> :
                    success ? <Alert variant="info">Ten post został usunięty.</Alert> : null
                }
                <Card.Title as="h1" className="post_title">
                    <Row>
                        {post.title === "" ? "Tytuł posta" : post.title}
                        {renderButtons(post.id, user, post.author, setDelError, setSuccess, setWantsEdition, success)}
                    </Row>
                </Card.Title>
                <Card.Subtitle as="h6" className="text-muted mb-4 mt-2">Kategoria: {post.category}</Card.Subtitle>
                <Card.Text className="blog_content_text text-justify">
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </Card.Text>
                <p className="post_taglist mt-5">
                    <em>tagi: {renderTags(post.tags)}</em>
                </p>
            </Card.Body>
            <Card.Footer className="blogpost_summary">
                <Row>
                    <Col className="mx-3">
                        <Row className="">{`Autor: ${firstName} ${lastName} (${email})`}</Row>
                        <Row>{`Opublikowano: ${getDateString(post.creationDate)}`}</Row>
                    </Col>
                    <div className="post_comment_counter">
                        <Row className="text-right mx-3">Liczba komentarzy: {post.comments.length}</Row>
                    </div>
                </Row>
                {renderRedirect(wantsEdition, post.id)}
            </Card.Footer>
        </Card>
    )
};

export default BlogContent