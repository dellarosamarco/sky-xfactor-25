import Logo from "../../assets/logo.png";
import "./SiteClosed.scss";

type SiteClosedProps = {
  loading: boolean;
  onRetry: () => Promise<void>;
  hasError: boolean;
};

const SiteClosed = ({ loading, onRetry, hasError }: SiteClosedProps) => {
  const handleRetry = async () => {
    await onRetry();
  };

  return (
    <div className="page site-closed">
      <img src={Logo} alt="Logo X Factor" className="site-closed__logo" width={280} height={190} />

      <div className="page__headline">
        <p className="text--lg">Il sito è momentaneamente chiuso</p>
        <p className="text--md">Torna Venerdì per giocare di nuovo</p>
      </div>

      <div className="site-closed__actions">
        <button className="button" onClick={handleRetry} disabled={loading}>
          Riprova ora
        </button>
        <p className="helper-text">Aggiorniamo la pagina appena riapre.</p>
      </div>

      {hasError && !loading && (
        <p className="site-closed__error" role="alert">
          Non riusciamo a verificare lo stato del sito. Riprova tra poco.
        </p>
      )}
    </div>
  );
};

export default SiteClosed;
