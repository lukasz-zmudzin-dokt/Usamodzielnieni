import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import "./CommentItem.css";
import { staffTypes } from "constants/staffTypes";
import { DeletionModal } from "components";
import { useState } from "react";
import { userTypes } from "constants/userTypes";
import { renderWithTimeout } from "utils/renderWithTimeout/renderWithTimeout";

const CommentItem = ({ comment, onDeleteClick, user, ...rest }) => {
  const canModifyComment = (user) =>
    user.data
      ? comment.author?.email === user.data.email ||
        (user.type === userTypes.STAFF &&
          user.data.group_type.includes(staffTypes.BLOG_MODERATOR))
      : false;
  const handleOnClick = () => {
    setShowModal(true);
  };
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (deletionConfirmed) onDeleteClick(comment.id);

  const delButton = () => (
    <ButtonGroup className="commentItem__actions" size="sm">
      <Button onClick={handleOnClick}>Usuń</Button>
    </ButtonGroup>
  );
  let now = new Date();
  let date = new Date(comment.creationDate);
  let timeout =
    now.getTime() > date.getTime() + 60000
      ? 0
      : 60000 - (now.getTime() - date.getTime());

  return (
    <div className="commentItem" {...rest}>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={setDeletionConfirmed}
        question={"Czy na pewno chcesz usunąć ten komentarz?"}
      />
      <h5 className="commentItem__header">{`${
        comment.author?.username || "Użytkownik nieaktywny"
      }`}</h5>
      <small className="commentItem__date">
        dodano: {comment.creationDate.toLocaleDateString(undefined, {})}
      </small>
      <p className="commentItem__content">{comment.content}</p>
      {user && canModifyComment(user) !== false
        ? renderWithTimeout(delButton, timeout)
        : null}
    </div>
  );
};

export default CommentItem;
