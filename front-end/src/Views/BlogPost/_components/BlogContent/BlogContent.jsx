import React from 'react'
import {Card, Col, Row} from "react-bootstrap";
import "./BlogContent.css";

const BlogContent = ({ post }, user) => {
    console.log(post);
    const {firstName, lastName, email} = post.author;
    return (
        <Card>
            {post.header !== undefined ?
                <Card.Img variant="top" src={post.header}/> : <Card.Header/>
            }
            <Card.Body className="post_content">
                <Card.Title className="post_title">Post title</Card.Title>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <p className="post_taglist">{post.tags}</p>
            </Card.Body>
            <Card.Footer className="blogpost_summary">
                <Row>
                    <Col>
                        <Row>{`Autor: ${firstName} ${lastName} (${email})`}</Row>
                        <Row>{`opublikowano ${post.creationDate}.`}</Row>
                    </Col>
                    <Col className="post_comment_counter float-right">Liczba komentarzy: {post.comments.length}</Col>
                </Row>
            </Card.Footer>
        </Card>
    )
};

export default BlogContent
