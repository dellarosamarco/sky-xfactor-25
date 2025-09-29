import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import './Homepage.scss';

const Homepage = () => {
    const navigate = useNavigate();

    const onContinue = () => {
        navigate('/performances');
    }

    return (
        <div className="page homepage">
            <div className="homepage-wrapper">
                <div className='homepage-wrapper-title'>
                    <p className="text--lg">Fai il giudice di X Factor per un giorno!</p>
                </div>

                <div className="homepage-wrapper-icon">
                    <img src={Logo} width={320}></img>
                </div>

                <div className='homepage-wrapper-email-box'>
                    <p className='text--md'>E-mail:</p>
                    <input className='input'></input>
                    <button className='button' onClick={onContinue}>Invia e inizia!</button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;