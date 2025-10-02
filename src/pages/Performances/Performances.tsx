import { use, useEffect, useState } from 'react';
import './Performances.scss';
import { useNavigate } from 'react-router-dom';
import { getPerformances } from '../../firebase/perfromancesService';

const Performances = () => {
    const navigate = useNavigate();
    const [isWatching, setIsWatching] = useState(false);
    const [performanceIndex, setPerformanceIndex] = useState(0);
    const [firstPerformance, setFirstPerformance] = useState<string | undefined>();
    const [secondPerformance, setSecondPerformance] = useState<string | undefined>();

    useEffect(() => {
        loadPerformances();
    }, []);

    const loadPerformances = async () => {
        const performances = await getPerformances();
        setFirstPerformance(performances.firstPerformance);
        setSecondPerformance(performances.secondPerformance);
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
                {
                    <video key={performanceIndex} width={880} height={495} controls autoPlay>
                        <source src={performanceIndex === 0 ? firstPerformance : secondPerformance} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                }

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
                <p className="text--md">Stai per vedere <span>2 performance</span>.</p>
            </div>

            <div className="performances-description">
                <p className='text--md'>Alla fine ti chiederemo di immedesimarti in un giudice e <br></br>dare<span> il tuo feedback</span>.</p>
            </div>

            <div className='performances-action'>
                <button className='button' onClick={() => setIsWatching(true)}>Guarda</button>
            </div>

            <div className="performances-info">
                <p className='text--md'>(Durata esperienza: circa 3 minuti)</p>
            </div>
        </div>
    );
}

export default Performances;