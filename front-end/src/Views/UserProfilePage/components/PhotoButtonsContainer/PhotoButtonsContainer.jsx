import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { ChangePhotoButton, DeletePhotoButton } from "../";

const PhotoButtonsContainer = ({ user }) => {
  return (
    <ButtonGroup size="sm">
      <ChangePhotoButton user={user} />
      <DeletePhotoButton user={user} />
    </ButtonGroup>
  );
};

export default PhotoButtonsContainer;
