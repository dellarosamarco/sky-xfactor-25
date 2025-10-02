import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Suggestions.scss';

const Suggestions = () => {
    const navigate = useNavigate();
    const [flipped, setFlipped] = useState([false, false, false]);

    const onContinue = () => {
        navigate('/recorder');
    };

    const handleFlip = (index: number) => {
        if (!flipped[index]) {
            const newFlipped = [...flipped];
            newFlipped[index] = true;
            setFlipped(newFlipped);
        }
    };

    const allFlipped = flipped.every(Boolean);

    return (
        <div className="page suggestions-page">
            <div className="suggestions-cards">
                <div className="suggestions-cards-row">
                    
                    <div 
                        className="suggestion-card suggestion-card-1"
                        onMouseEnter={() => handleFlip(0)} 
                        onClick={() => handleFlip(0)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <p className='card-preview'>1</p>
                            </div>
                            <div className="card-back">
                                <p>Parti dal positivo: cosa hai visto che ha funzionato bene? <br />Fai esempi concreti, non limitarti a dire "Bravo, mi piace"</p>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="suggestion-card suggestion-card-2"
                        onMouseEnter={() => handleFlip(1)} 
                        onClick={() => handleFlip(1)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <p className='card-preview'>2</p>
                            </div>
                            <div className="card-back">
                                <p>Affronta i punti di miglioramento: Cosa non ha funzionato o poteva andare meglio? <br />Fai esempi specifici</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div 
                    className="suggestion-card suggestion-card-3"
                    onMouseEnter={() => handleFlip(2)} 
                    onClick={() => handleFlip(2)}
                >
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
                <button 
                    className='button' 
                    onClick={onContinue} 
                    disabled={!allFlipped}
                >
                    Ora registra il tuo feedback!
                </button>
            </div>
        </div>
    );
};

export default Suggestions;
