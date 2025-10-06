import { useState, useEffect } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import "./Recorder.scss";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../firebase/videoService";
import { sendVideoEmail } from "../../firebase/emailService";
import { useLoader } from "../../context/LoaderContext";
import PlayIcon from './../../assets/play.svg';
import StopIcon from './../../assets/stop.svg';
import RetryIcon from './../../assets/retry.svg';
import { useBackgroundMusic } from './../../context/BackgroundMusicContext';

const MAX_DURATION = 45;

const Recorder = () => {
  const { mute } = useBackgroundMusic();
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [recordedVideo, setRecordedVideo] = useState<Blob | undefined>();
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(MAX_DURATION);

  useEffect(() => {
    mute();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (recording) {
      setCountdown(MAX_DURATION);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setRecording(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const onRetry = () => {
    setRecordedVideo(undefined);
    setRecording(true);
  };

  const onContinue = async () => {
    if (!recordedVideo) return;

    showLoader();
    const url = await uploadVideo(recordedVideo);

    if (!url) {
      hideLoader();
      return;
    }

    await sendVideoEmail(url);
    hideLoader();
    navigate('/thanksgiving');
  };

  return (
    <div className="page recorder">
      {recording && (
        <div className="recorder__timer" role="timer" aria-live="assertive">
          <span className="recorder__timer-dot" aria-hidden="true" />
          {countdown}s
        </div>
      )}

      <div className="recorder__hero">
        <span className="recorder__badge">Fase 3 · Condivisione</span>
        <div className="page__headline">
          <p className="text--lg">Registra il tuo video-feedback</p>
          <p className="text--md">
            Hai fino a <span className="strong">{MAX_DURATION} secondi</span>. Segui i tre consigli appena scoperti e parla come se fossi davanti al talento.
          </p>
        </div>
      </div>

      <div className="recorder__layout">
        <div className="recorder__preview" aria-live="polite">
          <VideoRecorder
            width={880}
            height={495}
            onVideoRecordered={(video) => setRecordedVideo(video)}
            recording={recording}
            setRecording={setRecording}
          />
        </div>

        <aside className="recorder__panel">
          <p className="recorder__hint">Respira, sorridi e guarda in camera:</p>
          <ul className="recorder__guide">
            <li>Apri con un apprezzamento sincero</li>
            <li>Spiega un punto da migliorare: fai un esempio</li>
            <li>Chiudi con un invito concreto su cosa provare alla prossima esibizione.</li>
          </ul>
        </aside>
      </div>

      <div className="recorder__actions">
        {recordedVideo && (
          <>
            <button className="button" onClick={onContinue}>
              Invia il tuo feedback
            </button>
            <button className="button button--ghost" onClick={onRetry}>
              <img src={RetryIcon} alt="" className="recorder__icon" />
              Rifai registrazione
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Recorder;
