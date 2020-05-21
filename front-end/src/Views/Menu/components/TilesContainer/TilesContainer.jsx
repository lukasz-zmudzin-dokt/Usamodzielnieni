import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Tile } from "../";
import proxy from "config/api";

const tmpTiles = [
  {
    id: "1",
    title: "Telefon zaufania",
    color: "lightblue",
    show: { left: true, top: true, right: true },
    imageUrl: "/warsztaty.png",
  },
  {
    id: "2",
    title: "Zapytaj",
    color: "beige",
    show: { left: true, top: true, right: true },
    imageUrl: "/zapytaj.png",
  },
  {
    id: "3",
    title: "Warsztaty",
    color: "coral",
    show: { top: true },
    imageUrl: "/zdrowie.png",
  },
  {
    id: "4",
    title: "Telefon zaufania",
    color: "cornflowerblue",
    show: { left: true, top: true, right: true },
    imageUrl: "/zapytaj.png",
  },
  {
    id: "5",
    title: "Zapytaj",
    color: "burlywood",
    show: { top: true },
    imageUrl: "/zdrowie.png",
  },
  {
    id: "6",
    title: "Warsztaty",
    color: "mediumpurple",
    show: { left: true, top: true, right: true },
    imageUrl: "/warsztaty.png",
  },
];

const getTiles = async () => {
  let url = `${proxy.plain}/list`; // TODO
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  return tmpTiles;

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
    show: tile.show,
    imageUrl: tile.url,
    // TODO
  }));

const TilesContainer = () => {
  const [tiles, setTiles] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTiles = async () => {
      let res;
      try {
        res = await getTiles();
      } catch (e) {
        console.log(e);
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

  return (
    msg || (
      <div className="tilesGrid">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            color={tile.color}
            imageUrl={tile.imageUrl}
            showImage={tile.show}
            title={tile.title}
          />
        ))}
      </div>
    )
  );
};

export default TilesContainer;
