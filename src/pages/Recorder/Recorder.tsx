import { useState, useEffect } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import './Recorder.scss';
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
            setCountdown(MAX_DURATION); // resetta quando parte
            interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setRecording(false); // forza stop
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
        if(!recordedVideo) return;

        showLoader();
        const url = await uploadVideo(recordedVideo);
        
        if(!url) {
            hideLoader();
            return;
        };

        await sendVideoEmail(url);
        hideLoader();
        navigate('/thanksgiving');
    }

    return (
        <div className="page recorder">
            {/* Countdown */}
            {recording && (
                <div className="recorder__countdown">
                    {countdown}s
                </div>
            )}

            <VideoRecorder 
                width={880} 
                height={495} 
                onVideoRecordered={(video) => setRecordedVideo(video)} 
                recording={recording} 
                setRecording={setRecording}
            />

            <div className="recorder__controls">
                {/* Retry */}
                {recordedVideo && (
                    <button 
                        className="recorder__controls-control recorder__controls-control--retry" 
                        onClick={onRetry}
                    >
                        <img src={RetryIcon} alt="Retry" />
                    </button>
                )}
            </div>

            <div className="recorder__actions">
                { recordedVideo && 
                    <button className="button" onClick={onContinue}>
                        Invia il tuo feedback
                    </button> 
                }
            </div>
        </div>
    );
}

export default Recorder;
