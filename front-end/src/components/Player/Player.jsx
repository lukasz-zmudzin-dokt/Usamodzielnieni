import YouTube from "react-youtube";
import React from "react";

export const Player = ({src}) => {

    const _onReady = event => {
        event.target.pauseVideo();
    };

    const videoProps = {
        playerVars: {
            autoplay: 1
        }
    };

    return (
        <YouTube className="mb-3" videoId={src || "dQw4w9WgXcQ"} opts={videoProps} onReady={_onReady} />
    )
};