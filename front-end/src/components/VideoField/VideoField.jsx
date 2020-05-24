import React, { useState, useEffect, useContext } from "react";
import YouTube from "react-youtube";
import { ChangeVideo } from "./components";
import { UserContext } from "context";
import { getUrl } from "./functions";
import { Alert } from "react-bootstrap";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";

const VideoField = ({ id = 1 }) => {
  const [video, setVideo] = useState({ id: 0 });
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    // const search = url.lastIndexOf("=");
    setLoading(true);
    const getVideos = async () => {
      let res;
      try {
        res = await getUrl(user.token, id);
        let changeRes = res;
        const index = res.url.lastIndexOf("=");
        changeRes.url = res.url.slice(index + 1);
        setVideo(changeRes);
      } catch (e) {
        setErr(true);
      }
      setLoading(false);
    };
    getVideos();
    // setVideoID(url.slice(search + 1));
  }, [id, user.token]);

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
    user.type === userTypes.STAFF &&
    user.data.group_type?.includes(staffTypes.BLOG_MODERATOR);

  const msg = err ? (
    <Alert variant="danger">Wystąpił błąd podczas wczytywania filmu.</Alert>
  ) : loading ? (
    <Alert variant="info">Ładowanie...</Alert>
  ) : null;

  return (
    msg || (
      <div className="videoField__container my-3">
        {video.url && (
          <YouTube
            className="videoField__video"
            videoId={video.url}
            opts={opts}
            onReady={onReady}
          />
        )}
        {conditional && <ChangeVideo id={id} token={user.token} />}
      </div>
    )
  );
};

export default VideoField;
