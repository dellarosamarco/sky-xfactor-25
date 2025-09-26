import { useEffect, useState } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import './Recorder.scss';

const Recorder = () => {
    const [countdown, setCountdown] = useState(10);

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
                <VideoRecorder width={880} height={495}></VideoRecorder>
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