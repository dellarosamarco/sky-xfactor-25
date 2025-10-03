import { useBackgroundMusic } from "./../../context/BackgroundMusicContext"; 
import "./Navbar.scss";

const Navbar = () => {
  const { toggleMute, isMuted } = useBackgroundMusic();

  return (
    <nav className="navbar">
      <button className="music-btn" onClick={toggleMute}>
        <span className={`icon ${isMuted ? "muted" : "unmuted"}`}>
          {isMuted ? "🔇" : "🔊"}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
