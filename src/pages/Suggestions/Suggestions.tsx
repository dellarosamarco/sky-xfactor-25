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
                        <p>1</p>
                    </div>

                    <div className="suggestion-card suggestion-card-2">
                        <p>2</p>
                    </div>
                </div>

                <div className="suggestion-card suggestion-card-3">
                    <p>3</p>
                </div>
            </div>

            <div className="suggestions-page-action">
                <button className='button' onClick={() => onContinue()}>Ora registra il tuo feedback!</button>
            </div>
        </div>
    );
}

export default Suggestions;