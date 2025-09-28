import { useState } from 'react';
import './Performances.scss';
import YoutubePlayer from '../../components/YoutubePlayer/YoutubePlayer';
import { useNavigate } from 'react-router-dom';

const Performances = () => {
    const navigate = useNavigate();
    const [isWatching, setIsWatching] = useState(false);
    const [performanceIndex, setPerformanceIndex] = useState(0);

    const getVideoId = () => {
        switch(performanceIndex) {
            case 0:
                return "https://www.youtube.com/embed/J0EGbPpkCb4?enablejsapi=0";
            case 1:
                return "https://www.youtube.com/embed/DCQlw0CO2NM?enablejsapi=0";
            default:
                return "https://www.youtube.com/embed/DCQlw0CO2NM?enablejsapi=0";
        }
    }

    const onCompleteVideo = () => {
        if(performanceIndex === 0) {
            setPerformanceIndex(1);
        }
        else {
            navigate('/recorder');
        }
    }

    if(isWatching) {
        return (
            <div className='page'>
                <YoutubePlayer width={880} height={495} videoId={getVideoId()}></YoutubePlayer>

                <div className='performances-action'>
                    <button className='button' onClick={onCompleteVideo}>
                        {performanceIndex === 0 ? 'Vai alla 2° esibizione' : 'Dai il tuo feedback'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page performances">
            <div className="performances-title">
                <p className="text--lg">Stai per vedere <span>2 performance</span>.</p>
            </div>

            <div className="performances-description">
                <p className='text--lg'>Alla fine ti chiederemo di<br></br>dare<span> il tuo feedback da giudice</span>.</p>
            </div>

            <div className='performances-action'>
                <button className='button' onClick={() => setIsWatching(true)}>Guarda</button>
            </div>

            <div className="performances-info">
                <p className='text--md'>(L'esperienza durerà circa 3 minuti)</p>
            </div>
        </div>
    );
}

export default Performances;