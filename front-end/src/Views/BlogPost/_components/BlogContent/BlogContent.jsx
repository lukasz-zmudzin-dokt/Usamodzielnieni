import React from 'react'
import {Alert, Badge, Card, Col, Row} from "react-bootstrap";
import "./BlogContent.css";

const getDateString = dateString => {
    return dateString.substring(8,10) + "." + dateString.substring(5, 7) + "." + dateString.substring(0, 4);
};

const renderTags = tagList => {
    if (tagList.length === 0) {
        return "Brak tagów.";
    }
    else return tagList.map(tag => {
        return <Badge variant="info" key={tag} className="mx-1">{tag}</Badge>
    });
};

const BlogContent = ({ post }, user) => {
    if (post === undefined)
        return <Alert variant="danger" className="d-lg-block">Wystąpił błąd podczas ładowania zawartości bloga.</Alert>;
    const {firstName, lastName, email} = post.author;
    return (
        <Card>
            {post.header !== undefined ?
                <Card.Img variant="top" src={post.header}/> : <Card.Header/>
            }
            <Card.Body className="post_content mx-4">
                <Card.Title as="h3" className="post_title">{post.title === undefined ? "Tytuł posta" : post.title}</Card.Title>
                <Card.Subtitle as="h6" className="text-muted mb-4 mt-2">Kategoria: {post.category}</Card.Subtitle>
                <Card.Text className="blog_content_text text-justify">
                    {post.content}
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
            </Card.Footer>
        </Card>
    )
};

export default BlogContent
