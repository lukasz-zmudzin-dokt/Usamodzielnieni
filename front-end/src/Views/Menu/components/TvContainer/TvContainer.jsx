import React from "react";

const TvContainer = () => {
  return (
    <div className="tvContainer">
      <div className="tvContainer__shapes">
        <img className="tvContainer__shapes__left" alt="" src="/left_tv.svg" />
        <img
          className="tvContainer__shapes__right"
          alt=""
          src="/right_tv.svg"
        />
      </div>
      <div className="tvContainer__tv">
        <img alt="" src="/tv.png" />
      </div>
    </div>
  );
};

export default TvContainer;
