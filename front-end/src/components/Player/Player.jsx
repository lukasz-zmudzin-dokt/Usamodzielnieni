import YouTube from "react-youtube";
import React from "react";

const Player = ({ src }) => {
  const _onReady = (event) => {
    event.target.pauseVideo();
  };

  const videoProps = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <YouTube
      className="yt_player"
      videoId={src || "dQw4w9WgXcQ"}
      opts={videoProps}
      onReady={_onReady}
    />
  );
};

export default Player;
