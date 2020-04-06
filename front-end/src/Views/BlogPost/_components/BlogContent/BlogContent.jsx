import React from 'react'
import {Badge, Card, Col, Row} from "react-bootstrap";
import "./BlogContent.css";

const getDateString = dateString => {
    return dateString.substring(8,10) + "." + dateString.substring(5, 7) + "." + dateString.substring(0, 4);
};

const BlogContent = ({ post }, user) => {
    const {firstName, lastName, email} = post.author;
    return (
        <Card>
            {post.header !== undefined ?
                <Card.Img variant="top" src={post.header}/> : <Card.Header/>
            }
            <Card.Body className="post_content">
                <Card.Title as="h3" className="post_title">Post title</Card.Title>
                <Card.Text className="blog_content_text mx-3 text-justify">
                    {post.content}
                </Card.Text>
                <p className="post_taglist mt-5 mx-4">
                    <em>tagi: {post.tags.map(tag => {
                        return <Badge variant="info" key={tag} className="mx-1">{tag}</Badge>
                    })}</em>
                </p>
            </Card.Body>
            <Card.Footer className="blogpost_summary">
                <Row>
                    <Col className="mx-3">
                        <Row className="">{`Autor: ${firstName} ${lastName} (${email})`}</Row>
                        <Row>{`opublikowano: ${getDateString(post.creationDate)}`}</Row>
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
