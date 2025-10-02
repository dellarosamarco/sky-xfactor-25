import { use, useEffect, useState } from 'react';
import './Performances.scss';
import { useNavigate } from 'react-router-dom';
import { getPerformances } from '../../firebase/perfromancesService';
import { useLoader } from '../../context/LoaderContext';

const Performances = () => {
    const navigate = useNavigate();
    const [isWatching, setIsWatching] = useState(false);
    const [performanceIndex, setPerformanceIndex] = useState(0);
    const [firstPerformance, setFirstPerformance] = useState<string | undefined>();
    const [secondPerformance, setSecondPerformance] = useState<string | undefined>();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        loadPerformances();
    }, []);

    const loadPerformances = async () => {
        showLoader();
        const performances = await getPerformances();
        setFirstPerformance(performances.firstPerformance);
        setSecondPerformance(performances.secondPerformance);
        hideLoader();
    }

    const onViewSuggestions = () => {
        navigate('/suggestions');
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

                {
                    performanceIndex === 0 ? (
                        <div className='performances-action'>
                            <button className='button' onClick={onCompleteVideo}>
                                Vai alla 2° esibizione
                            </button>
                        </div>
                    ) : (
                        <div className='performances-actions'>
                            <button className='button button-register' onClick={onCompleteVideo}>
                                Registra <br></br>il tuo feedback
                            </button>

                            <button className='button button-feedback' onClick={onViewSuggestions}>
                                Ricevi consigli <br></br>per un buon feedback
                                <div className='button-hint'>Scelta consigliata</div>
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <div className="page performances">
            <div className="performances-title">
                <p className="text--lg">Stai per vedere 2 performance.</p>
            </div>

            <div className="performances-description">
                <p className='text--md'>Immedesimati in un <span className='strong'>giudice di X Factor</span>!</p>
            </div>

            <div className="performances-description">
                <p className='text--md'>Alla fine ti chiederemo di registrare <br></br><span className='strong'>il tuo video-feedback</span>.</p>
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