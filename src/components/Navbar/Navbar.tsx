import { useBackgroundMusic } from "./../../context/BackgroundMusicContext"; 
import "./Navbar.scss";
import HomeIcon from "../../assets/home.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleMute, isMuted } = useBackgroundMusic();

  const handleHomeClick = () => {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="music-btn" onClick={handleHomeClick}>
        <img src={HomeIcon} alt="Home" className="home-icon" width={40}/>
      </div>

      <button className="music-btn" onClick={toggleMute}>
        <span className={`icon ${isMuted ? "muted" : "unmuted"}`}>
          {isMuted ? "🔇" : "🔊"}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
