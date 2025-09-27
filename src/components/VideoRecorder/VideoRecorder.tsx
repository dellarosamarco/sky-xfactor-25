import React, { useEffect, useRef } from "react";
import { VideoRecorderProps } from "./VideoRecorder.types";

const VideoRecorder: React.FC<VideoRecorderProps> = ({ width, height, onVideoRecordered, recording, setRecording }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true, });

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
  }, []);

  useEffect(() => {
    if (recording) {
      startRecording();
    } 
    else {
      stopRecording();
    }
  }, [recording]);

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "recording") {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: width + 'px', height: height + 'px', objectFit: 'cover' }} />
    </div>
  );
};

export default VideoRecorder;