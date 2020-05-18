import React from "react";
import { ListGroup } from "react-bootstrap";
import UserProperty from "Views/UserProfilePage/components/UserProperty";

const UserDetails = (props) => {
  const { user, names } = props;
  const ignore = ["firstName", "lastName", "role"];

  const userProperties = Object.keys(user).map((key) => {
    return !ignore.find((i) => i === key) ? (
      <UserProperty key={key} user={user} property={key} names={names} />
    ) : null;
  });

  return <ListGroup className="list-group-flush">{userProperties}</ListGroup>;
};

export default UserDetails;
