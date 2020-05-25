import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { DeletionModal } from "components";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";
import { Player } from "../../../../components";

const VideoCard = ({ content, user, cutCard }) => {
  const [toDelete, setToDelete] = useState(false);

  const sliceUrl = (url) => {
    let changeRes;

    const index = url.lastIndexOf("=");
    changeRes = url.slice(index + 1);
    return changeRes;
  };

  return (
    <Card border="dark">
      {user?.type === userTypes.STAFF &&
        user?.data?.group_type.includes(staffTypes.BLOG_CREATOR) && (
          <div className="text-right">
            <Button
              variant="light"
              size="sm"
              onClick={(e) => setToDelete(true)}
            >
              X
            </Button>
          </div>
        )}
      <div>
        <Player src={sliceUrl(content.url)} />
      </div>
      <Card.Text className="text-justify mx-2 my-3">
        {content.description}
      </Card.Text>
      <DeletionModal
        show={toDelete}
        setShow={setToDelete}
        question="Czy na pewno chcesz usunąć tę kartę?"
        delConfirmed={() => cutCard(content.id)}
      />
    </Card>
  );
};

export default VideoCard;
