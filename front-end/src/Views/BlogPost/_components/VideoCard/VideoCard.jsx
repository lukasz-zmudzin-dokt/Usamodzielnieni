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
                    <div className="text-right">
                        <Button variant="light" size="sm" onClick={e => setToDelete(true)}>X</Button>
                    </div>
                )
            }
            <div>wideo</div> {/*url*/}
            <Card.Text>
                <Card.Subtitle className="text-right">

                </Card.Subtitle>
                {content.description}
            </Card.Text>
            <DeletionModal
                show={toDelete}
                setShow={setToDelete}
                question="Czy na pewno chcesz usunąć tę kartę?"
                delConfirmed={() => cutCard(content.id)}
            />
        </Card>
    )
};

export default VideoCard;