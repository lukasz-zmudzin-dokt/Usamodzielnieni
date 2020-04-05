import React from 'react'
import {Card} from "react-bootstrap";

const BlogContent = ({ post }, type) => {
    const {first_name, last_name, email} = post.author;
    return (
        <Card>
            <Card.Header>
                <img src={null} alt="Post header (img)" className="post_header_img"/>
            </Card.Header>
            <Card.Body>
                <Card.Title className="post_title">Post title</Card.Title>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <p className="post_taglist">{post.tags}</p>
            </Card.Body>
            <Card.Footer className="blogpost_summary">
                {`Autor: ${first_name} ${last_name} (${email}), opublikowano ${post.creationDate}.`}
                <p className="post_comment_counter">Liczba komentarzy: {post.comments.length}</p>
            </Card.Footer>
        </Card>
    )
};

export default BlogContent
