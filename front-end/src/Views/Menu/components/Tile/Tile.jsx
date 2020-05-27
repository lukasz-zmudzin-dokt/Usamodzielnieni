import React from "react";
import { Link } from "react-router-dom";
import { matchPath } from "react-router-dom";

import routesInfo from "constants/routesInfo";
import {Button} from "react-bootstrap";
import {staffTypes} from "constants/staffTypes";

const Tile = ({ title, showImage, imageUrl, color, destination, user, previewOnly }) => {
  const getClassNames = (name, position) =>
    `tile__${name} tile__${name}--${position} ${
      showImage[position] ? "tile__fragment--show" : ""
    }`;
  const positions = ["left", "top", "right"];

  const matchingRoutes = routesInfo.filter((route) =>
    matchPath(destination, route)
  );
  const myRoute = matchingRoutes.find(
    (route) => !route.isPrivate || user.token
  );

  return (
    <Link
      to={destination}
      className="tile__container"
      style={{ backgroundColor: color }}
    >
      <div className="tile">
        {positions.map((position) => (
          <div
            key={`bg_${position}`}
            style={{backgroundColor: color}}
            className={getClassNames("bg", position)}
          />
        ))}
        <div className="tile_content">
          {positions.map((position) => (
            <div
              key={`border_${position}`}
              className={getClassNames("border", position)}
            />
          ))}
          <div className="tile__image">
            <img alt="" src={imageUrl} />
          </div>
          <div className="tile_title">
            <span>{myRoute ? title : `Zaloguj się i ${title}`}</span>
          </div>
        </div>
      </div>
      {
        !previewOnly && user.data?.group_type.includes(staffTypes.BLOG_MODERATOR) && (
            <div className="tile__button__container">
              <Button size="sm" className="tile__button tile__button__edit" variant="primary"><img className="tile__button__edit__icon" src="/editicon.svg" alt="Edytuj"/></Button>
              <Button size="sm" className="tile__button tile__button__delete" variant="danger"><img className="tile__button__delete__icon" src="/deleteicon.svg" alt="Usuń"/></Button>
            </div>
        )
      }
    </Link>
  );
};

export default Tile;
