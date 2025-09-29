import { useEffect, useState } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import './Recorder.scss';
import { useNavigate } from "react-router-dom";

const Recorder = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);
    const [recordedVideo, setRecordedVideo] = useState<Blob | undefined>();
    const [recording, setRecording] = useState(false);

    const downloadRecording = () => {
        if(!recordedVideo) return;

        const url = URL.createObjectURL(recordedVideo);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm";
        a.click();
        URL.revokeObjectURL(url);
    };

    const onContinue = () => {
        downloadRecording();
        navigate('/thanksgiving');
    }

    useEffect(() => {
        if(countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    if(countdown === 0) { 
        return (
            <div className="page recorder">
                <VideoRecorder 
                    width={880} 
                    height={495} 
                    onVideoRecordered={(video) => setRecordedVideo(video)} 
                    recording={recording} 
                    setRecording={setRecording}
                ></VideoRecorder>

                <div className="recorder__actions">
                    <button className="button" onClick={() => setRecording(!recording)}>{recording ? 'Stop' : 'Start' } recording</button>
                    { recordedVideo && <button className="button" onClick={() => onContinue()}>Invia il tuo feedback</button> }
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="recorder-countdown">
                <p className="recorder-countdown__text">{countdown}</p>
            </div>
        </div>
    );
}

export default Recorder;