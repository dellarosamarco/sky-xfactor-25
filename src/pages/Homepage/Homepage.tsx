import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import './Homepage.scss';
import { useState } from 'react';
import { register } from '../../firebase/authService';

const Homepage = () => {
    const [email, setEmail] = useState<string | undefined>();
    const navigate = useNavigate();

    const onRegister = async () => { 
        if(!email) return;

        const { error } = await register(email, '12345');

        if(error) {
            alert(error);
            return;
        }

        onContinue();
    }

    const onContinue = async () => {
        navigate('/performances');
    }

    return (
        <div className="page homepage">
            <div className="homepage-wrapper">
                <div className='homepage-wrapper-title'>
                    <p className="text--lg">Fai il giudice di X Factor per un giorno!</p>
                </div>

                <div className="homepage-wrapper-icon">
                    <img src={Logo} width={320} alt=""></img>
                </div>

                <div className='homepage-wrapper-email-box'>
                    <p className='text--md'>E-mail:</p>
                    <input className='input' onChange={(e) => setEmail(e.target.value)} ></input>
                    <button className='button' onClick={onContinue}>Invia e inizia!</button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;