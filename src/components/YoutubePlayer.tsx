import React, { useState } from "react";

const YouTubeEmbed: React.FC = () => {
  const [watchCount, setWatchCount] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const handlePlay = () => {
    if (watchCount < 1) {
      setWatchCount(watchCount + 1);
    } else {
      // dopo il secondo play blocca tutto
      setBlocked(true);
    }
  };

  return (
    <div style={{ position: "relative", width: "560px", height: "315px" }}>
      {!blocked ? (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=0"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handlePlay}
        />
      ) : (
        <div
          style={{
            width: "560px",
            height: "315px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "18px",
          }}
        >
          Limite raggiunto: non puoi più guardare il video.
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;
