import React from "react";
import { userTypes } from "constants/userTypes";
import proxy from "config/api";

const UserPicture = ({ user, ...rest }) => {
  const getColorClassSuffix = () => {
    if (user.type === userTypes.STAFF && user.data?.group_type?.length) {
      if (user.data.group_type.length > 1) {
        return "multi";
      }
      return user.data.group_type[0];
    }
    return "standard";
  };

  const getFirstLetters = () => {
    if (user.data?.first_name?.length && user.data?.last_name?.length) {
      return user.data.first_name[0] + user.data.last_name[0];
    }
    return "?";
  };

  const getClassName = () => {
    return !user.data?.picture_url
      ? `userPicture userPicture--${getColorClassSuffix()}`
      : `userPicture userPicture--img`;
  };

  return (
    <div className="userPicture__container" {...rest}>
      <div className={getClassName()}>
        {user.data?.picture_url ? (
          <img
            alt="Zdjęcie profilowe"
            src={proxy.plain + user.data.picture_url}
          />
        ) : (
          <span>{getFirstLetters()}</span>
        )}
      </div>
    </div>
  );
};

export default UserPicture;
