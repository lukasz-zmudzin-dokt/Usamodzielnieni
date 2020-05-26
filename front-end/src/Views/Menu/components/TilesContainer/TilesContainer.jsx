import React, {useState, useEffect, useContext} from "react";
import {Alert, Button} from "react-bootstrap";
import { Tile } from "../";
import proxy from "config/api";
import {UserContext} from "context/UserContext";
import {staffTypes} from "constants/staffTypes";
import NewTileForm from "../NewTileForm/NewTileForm";

const tmpTiles = [
  {
    id: "1",
    title: "Telefon zaufania",
    color: "lightblue",
    show: { left: true, top: true, right: true },
    imageUrl: "/warsztaty.png",
    destination: "/login",
  },
  {
    id: "2",
    title: "Zapytaj",
    color: "beige",
    show: { left: true, top: true, right: true },
    imageUrl: "/zapytaj.png",
    destination: "/login",
  },
  {
    id: "3",
    title: "Warsztaty",
    color: "coral",
    show: { top: true },
    imageUrl: "/zdrowie.png",
    destination: "/login",
  },
  {
    id: "4",
    title: "Telefon zaufania",
    color: "cornflowerblue",
    show: { left: true, top: true, right: true },
    imageUrl: "/zapytaj.png",
    destination: "/login",
  },
  {
    id: "5",
    title: "Zapytaj",
    color: "burlywood",
    show: { top: true },
    imageUrl: "/zdrowie.png",
    destination: "/login",
  },
  {
    id: "6",
    title: "Warsztaty",
    color: "mediumpurple",
    show: { left: true, top: true, right: true },
    imageUrl: "/warsztaty.png",
    destination: "/login",
  },
  {
    id: "21",
    title: "Telefon zaufania",
    color: "lightblue",
    show: { left: true, top: true, right: true },
    imageUrl: "/warsztaty.png",
    destination: "/login",
  },
  {
    id: "22",
    title: "Zapytaj",
    color: "beige",
    show: { left: true, top: true, right: true },
    imageUrl: "/zapytaj.png",
    destination: "/login",
  },
  {
    id: "23",
    title: "Warsztaty",
    color: "coral",
    show: { top: true },
    imageUrl: "/zdrowie.png",
    destination: "/login",
  },
  {
    id: "24",
    title: "Telefon zaufania",
    color: "cornflowerblue",
    show: { left: true, top: true, right: true },
    imageUrl: "/zapytaj.png",
    destination: "/login",
  },
  {
    id: "25",
    title: "Zapytaj",
    color: "burlywood",
    show: { top: true },
    imageUrl: "/zdrowie.png",
    destination: "/login",
  },
  {
    id: "26",
    title: "Warsztaty",
    color: "mediumpurple",
    show: { left: true, top: true, right: true },
    imageUrl: "/warsztaty.png",
    destination: "/login",
  },
];

const getTiles = async () => {
  let url = `${proxy.menu}`;
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  // return tmpTiles;

  // eslint-disable-next-line no-unreachable
  if (response.status !== 200) {
    throw response.status;
  }

  return response.json().then((tiles) => mapTiles(tiles));
};

const mapTiles = (tiles) =>
  tiles.map((tile) => ({
    id: tile.id,
    title: tile.title,
    color: tile.color,
    show: tile.photo_layer,
    imageUrl: tile.photo,
    destination: mapDestination(tile.destination),
    // TODO
  }));

const mapDestination = (destination) => destination; // TODO

const TilesContainer = () => {
  const [tiles, setTiles] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShow] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    const loadTiles = async () => {
      let res;
      try {
        res = await getTiles();
      } catch (e) {
        console.log(e);
        res = tmpTiles;
        setError(true);
      }
      setTiles(res);
    };
    loadTiles();
  }, []);

  const msg = error ? (
    <Alert variant="danger">Nie udało się pobrać menu.</Alert>
  ) : (
    !tiles && <Alert variant="info">Ładowanie menu...</Alert>
  );

  const appendTile = (newTile) => {
    let current = tiles;
    const idx = current.findIndex((tile) => tile.id === newTile.id);
    if (idx > -1) {
      current[idx] = newTile;
    } else {
      current.append(newTile);
    }
    setTiles(current);
  };

  return (
    (
      <div className="tilesGrid__container">
        <div className="tilesGrid">
          {console.log(tiles)}
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              color={tile.color}
              imageUrl={tile.imageUrl || ""}
              showImage={tile.show}
              title={tile.title}
              destination={tile.destination}
            />
          ))}
          {
            user?.data?.group_type?.includes(staffTypes.BLOG_MODERATOR) && (
                <>
                  <Button variant="primary" size="lg" block onClick={() => setShow(true)}>
                    Dupnij kafla
                  </Button>
                  <NewTileForm show={showModal} setShow={setShow} user={user} appendTile={appendTile} />
                </>
            )
          }
        </div>
      </div>
    )
  );
};

export default TilesContainer;
