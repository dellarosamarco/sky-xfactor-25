import { useState } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import './Recorder.scss';
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../firebase/videoService";
import { sendVideoEmail } from "../../firebase/emailService";
import { useLoader } from "../../context/LoaderContext";
import PlayIcon from './../../assets/play.svg';
import StopIcon from './../../assets/stop.svg';
import RetryIcon from './../../assets/retry.svg';

const Recorder = () => {
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const [recordedVideo, setRecordedVideo] = useState<Blob | undefined>();
    const [recording, setRecording] = useState(false);

    const onRetry = () => {
        // resetta la registrazione attuale
        setRecordedVideo(undefined);
        // avvia subito una nuova registrazione
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

                {/* Start/Stop */}
                <button 
                    className="recorder__controls-control" 
                    onClick={() => setRecording(!recording)}
                >
                    <img src={recording ? StopIcon : PlayIcon} alt="Play" />
                </button>
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
