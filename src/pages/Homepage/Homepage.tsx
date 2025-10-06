import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import './Homepage.scss';
import { useState } from 'react';
import { register } from '../../services/authService';
import { useLoader } from '../../context/LoaderContext';

const Homepage = () => {
  const { showLoader, hideLoader } = useLoader();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isValidEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
  };

  const handleRegister = async () => {
    if (!email) {
      setError('Inserisci la tua e-mail per partecipare.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Ops! Controlla il formato della tua e-mail.');
      return;
    }

    setError(null);
    showLoader();
    const { error: registerError } = await register(email.trim(), process.env.REACT_APP_TEMP_PASS);
    hideLoader();

    if (registerError) {
      setError(registerError);
      return;
    }

    navigate('/performances');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="page homepage">
      <div className="homepage__hero">
        <span className="homepage__badge">Esperienza esclusiva</span>
        <div className="page__headline">
          <p className="text--lg">Fai il giudice di X Factor per un giorno</p>
          <p className="text--md">
            Guarda due performance e registra il tuo <span className="strong">video feedback</span>.<br />
            Potresti vincere <span className="strong">2 biglietti</span> per il Live del <span className="strong">XX Ottobre</span>!
          </p>
        </div>
      </div>

      <div className="homepage__card">
        <img src={Logo} alt="Logo X Factor" className="homepage__logo" width={340} height={230} />

        <div className="homepage__form">
          <label htmlFor="email" className="homepage__label">
            Inserisci la tua e-mail per iniziare
          </label>
          <div className="homepage__input-row">
            <input
              id="email"
              className="input"
              type="email"
              placeholder="nome@esempio.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-invalid={Boolean(error)}
            />
            <button className="button" onClick={handleRegister}>
              Entra
            </button>
          </div>
          
          {error && <span className="homepage__error" role="alert">{error}</span>}
        </div>
      </div>

      <div className="homepage__steps">
        <div className="homepage__step">
          <span className="homepage__step-index">1</span>
          <p className="homepage__step-label">Guarda 2 performance</p>
        </div>
        <div className="homepage__step">
          <span className="homepage__step-index">2</span>
          <p className="homepage__step-label">Scopri i consigli dei coach</p>
        </div>
        <div className="homepage__step">
          <span className="homepage__step-index">3</span>
          <p className="homepage__step-label">Registra il tuo video-feedback</p>
        </div>
      </div>

      <p className="helper-text">Durata esperienza: circa 3 minuti. Puoi interrompere quando vuoi.</p>
    </div>
  );
};

export default Homepage;
