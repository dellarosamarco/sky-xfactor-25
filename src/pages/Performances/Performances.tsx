import { useEffect, useState } from 'react';
import './Performances.scss';
import { useNavigate } from 'react-router-dom';
import { getPerformances } from '../../firebase/perfromancesService';
import { useLoader } from '../../context/LoaderContext';
import { useBackgroundMusic } from './../../context/BackgroundMusicContext';

const TOTAL_PERFORMANCES = 2;

const Performances = () => {
  const navigate = useNavigate();
  const [isWatching, setIsWatching] = useState(false);
  const [performanceIndex, setPerformanceIndex] = useState(0);
  const [firstPerformance, setFirstPerformance] = useState<string | undefined>();
  const [secondPerformance, setSecondPerformance] = useState<string | undefined>();
  const { showLoader, hideLoader } = useLoader();
  const [firstPerformanceWatched, setFirstPerformanceWatched] = useState(false);
  const [secondPerformanceWatched, setSecondPerformanceWatched] = useState(false);

  const { mute } = useBackgroundMusic();

  useEffect(() => {
    if (isWatching) {
      mute();
    }
  }, [isWatching]);

  useEffect(() => {
    loadPerformances();
  }, []);

  const loadPerformances = async () => {
    showLoader();
    const performances = await getPerformances();
    setFirstPerformance(performances.firstPerformance);
    setSecondPerformance(performances.secondPerformance);
    hideLoader();
  };

  const onViewSuggestions = () => {
    navigate('/suggestions');
  };

  const onCompleteVideo = () => {
    if (performanceIndex === 0) {
      setPerformanceIndex(1);
    } else {
      navigate('/recorder');
    }
  };

  const onVideoEnded = () => {
    if (performanceIndex === 0) {
      setFirstPerformanceWatched(true);
    } else {
      setSecondPerformanceWatched(true);
    }
  };

  if (isWatching) {
    const currentStep = performanceIndex + 1;

    return (
      <div className='page performances performances--player'>
        <div className='performances__status'>
          <span className='performances__pill'>Performance {currentStep} di {TOTAL_PERFORMANCES}</span>
          <div className='performances__progress' aria-hidden='true'>
            <span
              className='performances__progress-bar'
              style={{ width: `${(currentStep / TOTAL_PERFORMANCES) * 100}%` }}
            />
          </div>
        </div>

        <div className='performances__player'>
          <video
            key={performanceIndex}
            controls
            autoPlay
            onEnded={onVideoEnded}
          >
            <source
              src={performanceIndex === 0 ? firstPerformance : secondPerformance}
              type='video/mp4'
            />
            Il tuo browser non supporta il tag video.
          </video>
        </div>

        {performanceIndex === 0 ? (
          <div className='performances__actions'>
            <button
              className='button performances__cta'
              onClick={onCompleteVideo}
              disabled={!firstPerformanceWatched}
            >
              Vai alla 2ª esibizione
            </button>
            <p className='helper-text'>
              Guarda fino alla fine per sbloccare il prossimo step.
            </p>
          </div>
        ) : (
          <div className='performances__actions performances__actions--dual'>
            <button
              className='button button-register'
              onClick={onCompleteVideo}
              disabled={!secondPerformanceWatched}
            >
              Registra il tuo feedback
            </button>

            <button
              className='button button-feedback'
              onClick={onViewSuggestions}
              disabled={!secondPerformanceWatched}
            >
              Consigli per un feedback top
              <span className='button-hint'>Scelta consigliata</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='page performances'>
      <div className='performances__hero'>
        <span className='performances__badge'>Fase 1 · Scouting</span>
        <div className='page__headline'>
          <p className='text--lg'>Stai per vedere due performance</p>
          <p className='text--md'>
            Immedesimati in un <span className='strong'>giudice di X Factor</span> e prendi nota delle tue impressioni.
          </p>
        </div>
        <ul className='performances__list'>
          <li>Ascolta con attenzione: valuta voce, presenza scenica e originalità.</li>
          <li>Annota mentalmente cosa ti ha colpito e cosa miglioreresti.</li>
          <li>Alla fine ti chiederemo di registrare il tuo video-feedback.</li>
        </ul>
      </div>

      <div className='performances__cta'>
        <button className='button' onClick={() => setIsWatching(true)}>
          Inizia
        </button>
        <p className='helper-text'>Durata totale esperienza: circa 3 minuti.</p>
      </div>
    </div>
  );
};

export default Performances;
