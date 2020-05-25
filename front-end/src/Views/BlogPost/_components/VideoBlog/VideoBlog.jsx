import React from "react";
import {Card, CardDeck} from "react-bootstrap";
import VideoCard from "../VideoCard/VideoCard";

const VideoBlog = ({user, post, alertC}) => {

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
                <CardDeck>
                    {post.content.map(item => (
                        <VideoCard content={item} alertC={alertC} user={user}/>
                    ))}
                </CardDeck>
            </Card.Body>
        </Card>
    )
};