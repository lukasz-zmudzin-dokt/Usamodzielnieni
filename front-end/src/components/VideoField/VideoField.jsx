import React, { useState, useEffect, useContext, useRef } from "react";
import YouTube from "react-youtube";
import { ChangeVideo } from "./components";
import { UserContext } from "context";
import { getUrl } from "./functions";
import { Alert } from "react-bootstrap";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";

const VideoField = ({ id, videoItem, errVid, activeTab }) => {
  const [video, setVideo] = useState({ id: 0 });
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const player = useRef(null);

  const sliceUrl = (url) => {
    let changeRes = url;

    const index = url.lastIndexOf("=");
    changeRes = url.slice(index + 1);
    return changeRes;
  };

  useEffect(() => {
    setLoading(true);
    const getVideos = async () => {
      let res;
      try {
        res = await getUrl(id);
        setVideo({ ...res, url: sliceUrl(res.url) });
      } catch (e) {
        setErr(true);
      }
      setLoading(false);
    };
    if (!videoItem && id) {
      getVideos();
    } else if (videoItem) {
      setVideo({ ...videoItem, url: sliceUrl(videoItem.url) });
      setLoading(false);
    } else if (errVid) {
      setLoading(false);
      setErr(true);
    }
    if (activeTab?.active !== activeTab?.your && player.current !== null) {
      player.current.resetPlayer();
    }
  }, [activeTab, errVid, id, videoItem]);

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
            ref={player}
          />
        )}
        {conditional && (
          <ChangeVideo
            id={id || videoItem?.id}
            video={video}
            setVideo={setVideo}
            token={user.token}
          />
        )}
      </div>
    )
  );
};

export default VideoField;
