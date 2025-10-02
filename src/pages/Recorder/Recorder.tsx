import { useState } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import './Recorder.scss';
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../firebase/videoService";
import { sendVideoEmail } from "../../firebase/emailService";
import { useLoader } from "../../context/LoaderContext";

const Recorder = () => {
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
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
            ></VideoRecorder>

            <div className="recorder__controls">
                <button className="recorder__controls-control" onClick={() => setRecording(!recording)}>{recording ? '▶︎' : '◼' }</button>
            </div>

            <div className="recorder__actions">
                { recordedVideo && <button className="button" onClick={() => onContinue()}>Invia il tuo feedback</button> }
            </div>
        </div>
    );
}

export default Recorder;