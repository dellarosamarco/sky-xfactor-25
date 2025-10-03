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
  };

  const handleAudioToggle = () => {
    toggleMute();
  };

  return (
    <nav className="navbar" aria-label="Navigazione principale">
      <div className="navbar__brand" role="presentation">
        <span className="navbar__logo" aria-hidden="true">
          SX
        </span>
        <div className="navbar__headline">
          <span className="navbar__title">Sky X Factor</span>
          <span className="navbar__subtitle">Talent Experience</span>
        </div>
      </div>

      <div className="navbar__actions">
        <button
          type="button"
          className="navbar__button navbar__button--home"
          onClick={handleHomeClick}
          aria-label="Torna alla home ed esci"
          title="Torna alla home"
        >
          <img src={HomeIcon} alt="" className="navbar__icon" width={22} height={22} />
          <span className="navbar__label">Home</span>
        </button>

        <button
          type="button"
          className="navbar__button navbar__button--audio"
          onClick={handleAudioToggle}
          aria-pressed={!isMuted}
          aria-label={isMuted ? "Audio disattivato" : "Audio attivo"}
          title={isMuted ? "Riattiva musica" : "Disattiva musica"}
        >
          <span className="navbar__icon" aria-hidden="true">
            {isMuted ? "🔇" : "🔊"}
          </span>
          <span className="navbar__label">{isMuted ? "Audio Off" : "Audio On"}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
