import React from "react";
import { VideoField } from "components";

const TvContainer = () => {
  return (
    <div className="tvContainer">
      <div className="tvContainer__shapes">
        <div className="tvContainer__shapes__left">
          <img alt="" src="/left_tv.svg" />
        </div>
        <div className="tvContainer__shapes__right">
          <img alt="" src="/right_tv.svg" />
        </div>
      </div>
      <div className="tvContainer__tv">
        <img alt="" src="/tv.png" />
        <div className="tvContainer__tv__video__container">
          <div className="tvContainer__tv__video">
            <div className="tvContainer__tv__video__space">
              <VideoField id="1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvContainer;
