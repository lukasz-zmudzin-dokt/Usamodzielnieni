import React, {useContext, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { matchPath } from "react-router-dom";

import routesInfo from "constants/routesInfo";
import {Button} from "react-bootstrap";
import {staffTypes} from "constants/staffTypes";
import {AlertContext} from "context/AlertContext";
import {DeletionModal} from "components";
import NewTileForm from "../NewTileForm/NewTileForm";
import proxy from "config/api";

const deleteTile = async (token, id) => {
  const url = proxy.menu + "tile/" + id + "/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };
  const res = await fetch(url, {headers, method: "DELETE"});

  if (res.status === 200) {
    return;
  } else {
    throw await res.json();
  }
};

const Tile = ({ id, title, showImage, imageUrl, color, destination, user, previewOnly, cutTile, appendTile }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const alertC = useRef(useContext(AlertContext));

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

  const handleDeletion = async() => {
    try {
      await deleteTile(user.token, id);
      alertC.current.showAlert("Kafelek usunięty pomyślnie.", "success");
      cutTile(id);
    } catch(e) {
      alertC.current.showAlert(Object.values(e)[0]);
    }
  };

  return (
    <div
        className="tile__container"
        style={{ backgroundColor: color }}
    >
      <Link
          to={destination}
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
      </Link>
      {
        !previewOnly && user.data?.group_type.includes(staffTypes.BLOG_MODERATOR) && (
            <div className="tile__button__container">
              <Button size="sm" className="tile__button tile__button__edit" variant="primary" onClick={() => setShowEdit(true)}>
                <img className="tile__button__edit__icon" src="/editicon.svg" alt="Edytuj"/>
              </Button>
              <Button size="sm" className="tile__button tile__button__delete" variant="danger" onClick={() => setShowDelete(true)}>
                <img className="tile__button__delete__icon" src="/deleteicon.svg" alt="Usuń"/>
              </Button>
              <DeletionModal
                show={showDelete}
                setShow={setShowDelete}
                question="Czy na pewno chcesz usunąć ten kafelek?"
                delConfirmed={handleDeletion}
              />
              <NewTileForm
                show={showEdit}
                setShow={setShowEdit}
                user={user}
                appendTile={appendTile}
                tileData={{
                  id: id,
                  title: title,
                  show: showImage,
                  color: color,
                  imageUrl: imageUrl,
                  destination: destination
                }}
              />
            </div>
        )
      }
    </div>
  );
};

export default Tile;
