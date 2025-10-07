import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import music from "../assets/music.mp3";

type MusicContextType = {
  mute: () => void;
  unmute: () => void;
  stop: () => void;
  toggleMute: () => void;   // 👈 aggiunto
  isMuted: boolean;
};

const BackgroundMusicContext = createContext<MusicContextType | undefined>(undefined);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = new Audio(music);
    audio.loop = true;
    audio.volume = 0.2;
    audio.muted = true;
    audio.play().catch(() => {
      console.log("Autoplay bloccato fino a interazione utente");
    });
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const mute = () => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const unmute = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsMuted(true);
    }
  };

  return (
    <BackgroundMusicContext.Provider value={{ mute, unmute, stop, toggleMute, isMuted }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusic = () => {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) throw new Error("useBackgroundMusic deve stare dentro BackgroundMusicProvider");
  return ctx;
};
