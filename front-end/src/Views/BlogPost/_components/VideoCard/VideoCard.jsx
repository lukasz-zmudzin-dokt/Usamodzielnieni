import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {DeletionModal} from "components";
import {userTypes} from "constants/userTypes";
import {staffTypes} from "constants/staffTypes";

const VideoCard = ({content, user, cutCard}) => {
    const [toDelete, setToDelete] = useState(false);

    return (
        <Card border="primary">
            {
                user?.type === userTypes.STAFF &&
                    user?.data?.group_type.includes(staffTypes.BLOG_CREATOR) && (
                    <Card.Subtitle className="justify-content-end">
                        <Button variant="light" onClick={e => setToDelete(true)}>X</Button>
                    </Card.Subtitle>
                )
            }
            <div>wideo</div> //url
            <Card.Text>
                {content.description}
            </Card.Text>
            <DeletionModal
                show={toDelete}
                setShow={setToDelete}
                question="Czy na pewno chcesz usunąć tę kartę?"
                delConfirmed={cutCard(content.id)}
            />
        </Card>
    )
};

export default VideoCard;