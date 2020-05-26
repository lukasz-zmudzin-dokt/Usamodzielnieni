import React from "react";
import { Link } from "react-router-dom";
import { matchPath } from "react-router-dom";

import routesInfo from "constants/routesInfo";

const Tile = ({ title, showImage, imageUrl, color, destination, user }) => {
  const getClassNames = (name, position) =>
    `tile__${name} tile__${name}--${position} ${
      showImage[position] ? "tile__fragment--show" : ""
    }`;
  const positions = ["left", "top", "right"];
  console.log("Tile", destination);

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
            style={{ backgroundColor: color }}
            className={getClassNames("bg", position)}
          ></div>
        ))}
        <div className="tile_content">
          {positions.map((position) => (
            <div
              key={`border_${position}`}
              className={getClassNames("border", position)}
            ></div>
          ))}
          <div className="tile__image">
            <img alt="" src={imageUrl} />
          </div>
          <div className="tile_title">
            <span>{myRoute ? title : `Zaloguj się i ${title}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Tile;
