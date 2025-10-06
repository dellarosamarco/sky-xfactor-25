import './ThanksGiving.scss';
import { useBackgroundMusic } from './../../context/BackgroundMusicContext';
import { useEffect } from 'react';
import { logout } from '../../services/authService';

const ThanksGiving = () => {
  const { unmute } = useBackgroundMusic();

  useEffect(() => {
    unmute();

    const attemptLogout = async () => {
      try {
        await logout();
      } catch {
        // Ignore logout errors to avoid blocking the user flow.
      }
    };

    attemptLogout();

    const timeoutId = window.setTimeout(async () => {
      await attemptLogout();
      window.location.replace('/');
    }, 20000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="page thanksgiving">
      <div className="thanksgiving__hero">
        <span className="thanksgiving__badge">E ora... il verdetto!</span>
        <div className="page__headline">
          <p className="text--lg">Grazie per aver partecipato!</p>
          <p className="text--md">Ti abbiamo inviato una copia del video via e-mail.</p>
        </div>
      </div>

      <div className="thanksgiving__card">
        <div className="thanksgiving__confetti" aria-hidden="true" />
        <div className="thanksgiving__icon" aria-hidden="true">✨</div>
        <p className="thanksgiving__highlight">
          I dieci colleghi che hanno dato<br></br>i feedback più curati e strutturati<br></br>vinceranno un biglietto per sé e un +1<br></br>per il Live del XX Ottobre
        </p>
        <p className="text--md">Tieni d’occhio la tua casella e-mail nei prossimi giorni per scoprire se sei tra i finalisti.</p>
        <div className="thanksgiving__steps">
          <div className="thanksgiving__step">
            <span className="thanksgiving__step-index">1</span>
            <span>Controlla anche la cartella Spam o Promozioni.</span>
          </div>
          <div className="thanksgiving__step">
            <span className="thanksgiving__step-index">2</span>
            <span>Aggiungi <strong>x-factor@sky.it</strong> ai tuoi contatti per non perdere l’annuncio.</span>
          </div>
        </div>
      </div>

      <p className="helper-text">Hai domande? Scrivici a <strong>x-factor@sky.it</strong> e ti risponderemo entro 24 ore.</p>
    </div>
  );
};

export default ThanksGiving;
