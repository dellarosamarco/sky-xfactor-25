import React from "react";
import { YoutubePlayerProps } from "./YoutubePlayer.types";

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  width,
  height,
  videoId
}) => {
  return (
    <div style={{ position: "relative", width: width + 'px', height: height + 'px' }}>
      <iframe
        width={width}
        height={height}
        src={videoId}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // onLoad={handlePlay}
      />
    </div>
  );
};

export default YoutubePlayer;
