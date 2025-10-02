import { useNavigate } from 'react-router-dom';
import './Suggestions.scss';

const Suggestions = () => {
    const navigate = useNavigate();
    
    const onContinue = () => {
        navigate('/recorder');
    }
    
    return (
        <div className="page suggestions-page">
            <div className="suggestions-cards">
                <div className="suggestions-cards-row">
                    
                    <div className="suggestion-card suggestion-card-1">
                        <div className="card-inner">
                            <div className="card-front">
                                <p className='card-preview'>1</p>
                            </div>
                            <div className="card-back">
                                <p>Parti dal positivo: cosa hai visto che ha funzionato bene? <br></br>Fai esempi concreti, non limitarti a dire "Bravo, mi piace"</p>
                            </div>
                        </div>
                    </div>

                    <div className="suggestion-card suggestion-card-2">
                        <div className="card-inner">
                            <div className="card-front">
                                <p className='card-preview'>2</p>
                            </div>
                            <div className="card-back">
                                <p>Affronta i punti di miglioramento: Cosa non ha funzionato o poteva andare meglio? <br></br>Fai esempi specifici</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="suggestion-card suggestion-card-3">
                    <div className="card-inner">
                        <div className="card-front">
                            <p className='card-preview'>3</p>
                        </div>
                        <div className="card-back">
                            <p>Costruisci insieme il futuro: cosa potrebbe fare diversamente la prossima volta?</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="suggestions-page-action">
                <button className='button' onClick={onContinue}>
                    Ora registra il tuo feedback!
                </button>
            </div>
        </div>
    );
}

export default Suggestions;
