import React, { useContext } from "react";
import { ButtonGroup } from "react-bootstrap";
import { ChangePhotoButton, DeletePhotoButton } from "../";
import { UserContext } from "context";

const PhotoButtonsContainer = () => {
  const user = useContext(UserContext);

  return (
    <ButtonGroup size="sm">
      <ChangePhotoButton user={user} />
      <DeletePhotoButton user={user} />
    </ButtonGroup>
  );
};

export default PhotoButtonsContainer;
