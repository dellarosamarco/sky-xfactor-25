import { useState } from 'react';
import './Feedback.scss';

const Feedback = () => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const onContinue = (choice: number) => {
        if(choice === 0) {
            
        }
        else {
            setShowSuggestions(true);
        }
    }

    if(showSuggestions) {
        
    }

    return (
        <div className="page feedback">
            <div className="feedback-title">
                <p className="text--md">Ora sei tu il giudice!</p>
            </div>

            <div className="feedback-description">
                <p className="text--md">Tra 10" partirà la registrazione di un breve video<br></br>in cui <span>dovrai esprimere il tuo feedback</span>sulle esibizioni che hai appena visto.</p>
            </div>

            <div className='feedback-info'>
                <p className="text--md">Vuoi dei suggerimenti prima di dare il tuo giudizio?</p>
            </div>

            <div className="feedback-actions">
                <button className='button' onClick={() => onContinue(0)}>Ci sono, partiamo!</button>
                <button className='button' onClick={() => onContinue(1)}>Voglio dei suggerimenti</button>
            </div>
        </div>
    );
}

export default Feedback;