import { useState } from 'react';
import './Performances.scss';

const Performances = () => {
    const [isWatching, setIsWatching] = useState(false);

    if(isWatching) {
        
    }

    return (
        <div className="page performances">
            <div className="performances-title">
                <p className="text--md">Stai per vedere <span>2 esibizioni</span> di 30" dei concorrenti<br></br>di XFactor.</p>
            </div>

            <div className="performances-description">
                <p className='text--md'>Osserva e ascolta con attenzione: <br></br>alla fine ti chiederemo di registrare un breve video ed esprimere<br></br><span>il tuo feedback da giudice</span>.</p>
            </div>

            <div className="performances-info">
                <p className='text--md'>(L'esperienza durerà circa 3 minuti)</p>
            </div>

            <div className='performances-action'>
                <button className='button' onClick={() => setIsWatching(true)}>Guarda le esibizioni</button>
            </div>
        </div>
    );
}

export default Performances;