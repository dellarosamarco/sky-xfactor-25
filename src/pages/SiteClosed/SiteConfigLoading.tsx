import Logo from "../../assets/logo.png";
import "./SiteClosed.scss";

const SiteConfigLoading = () => {
  return (
    <div className="page site-closed site-closed--loading">
      <img src={Logo} alt="Logo X Factor" className="site-closed__logo" width={280} height={190} />

      <div className="page__headline">
        <p className="text--lg">Caricamento in corso</p>
        <p className="text--md">
          Stiamo verificando la disponibilità dell'esperienza. Attendi qualche istante.
        </p>
      </div>

      <div className="site-closed__spinner" aria-hidden="true"></div>
    </div>
  );
};

export default SiteConfigLoading;
