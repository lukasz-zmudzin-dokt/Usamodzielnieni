import React, { useState, useEffect, useContext } from "react";
import YouTube from "react-youtube";
import { ChangeVideo } from "./components";
import { UserContext } from "context";

const VideoField = ({ url, id }) => {
  const [videoID, setVideoID] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    const search = url.lastIndexOf("=");
    setVideoID(url.slice(search + 1));
  }, [url]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const conditional =
    user.type === "Staff" && user.data.group_type.length === 5;

  return (
    videoID && (
      <div className="videoField__container">
        <YouTube videoId={videoID} opts={opts} onReady={onReady} />
        {conditional && <ChangeVideo id={id} token={user.token} />}
      </div>
    )
  );
};

export default VideoField;
