import React, { useEffect, useRef } from "react";
import { VideoRecorderProps } from "./VideoRecorder.types";
import "./VideoRecorder.scss";

const VideoRecorder: React.FC<VideoRecorderProps> = ({
  width,
  height,
  onVideoRecordered,
  recording,
  setRecording,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp9",
        });

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const blob = new Blob([event.data], { type: "video/webm" });
            onVideoRecordered(blob);
          }
        };
      } catch (err) {
        console.error("Errore nell’accesso a camera/microfono:", err);
      }
    };

    initMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recording]);

  const startRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "recording"
    ) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="video-recorder">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: width + "px",
          height: height + "px",
          objectFit: "cover",
        }}
      />

      {/* Bottone REC solo prima di iniziare */}
      {!recording && (
        <button className="rec-button" onClick={() => setRecording(true)}>
          <span className="rec-dot"></span> REC
        </button>
      )}

      {/* Bottone STOP solo durante la registrazione */}
      {recording && (
        <button className="stop-button" onClick={() => setRecording(false)}>
          ⏹ STOP
        </button>
      )}
    </div>
  );
};

export default VideoRecorder;
