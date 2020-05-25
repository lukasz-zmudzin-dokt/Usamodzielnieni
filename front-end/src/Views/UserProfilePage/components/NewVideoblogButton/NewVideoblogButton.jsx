import React, { useState } from "react";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";
import { Button } from "react-bootstrap";
import NewVideoBlogModal from "components/NewVideoBlogModal/NewVideoBlogModal";

const NewVideoblogButton = ({ user }) => {
  const [show, setShow] = useState(false);

  return (
    user.type === userTypes.STAFF &&
    user.data.group_type?.includes(staffTypes.BLOG_CREATOR) && (
      <>
        <Button
          variant="primary"
          className="my-2"
          onClick={(e) => setShow(true)}
        >
          Załóż nowy wideoblog
        </Button>
        <NewVideoBlogModal show={show} setShow={setShow} user={user} />
      </>
    )
  );
};

export default NewVideoblogButton;
