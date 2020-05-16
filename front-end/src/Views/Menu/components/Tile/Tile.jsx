import React from "react";

const Tile = ({ title, showImage, imageUrl, color }) => {
  return (
    <div className="tile__container" style={{ backgroundColor: color }}>
      <div className="tile">
        <div
          className={`tile__border tile__border--left ${
            showImage.left ? "tile__fragment--show" : ""
          }`}
        ></div>
        <div
          style={{ backgroundColor: color }}
          className={`tile__bg tile__bg--left ${
            showImage.left ? "tile__fragment--show" : ""
          }`}
        ></div>
        <div
          className={`tile__border tile__border--top ${
            showImage.top ? "tile__fragment--show" : ""
          }`}
        ></div>
        <div
          style={{ backgroundColor: color }}
          className={`tile__bg tile__bg--top ${
            showImage.top ? "tile__fragment--show" : ""
          }`}
        ></div>
        <div
          className={`tile__border tile__border--right ${
            showImage.right ? "tile__fragment--show" : ""
          }`}
        ></div>
        <div
          style={{ backgroundColor: color }}
          className={`tile__bg tile__bg--right ${
            showImage.right ? "tile__fragment--show" : ""
          }`}
        ></div>
        <div className="tile__image">
          <img alt="" src={imageUrl} />
        </div>
        <div className="tile_title">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
