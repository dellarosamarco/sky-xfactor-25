import Logo from './../../assets/logo.png';
import './Homepage.scss';

const Homepage = () => {
    const onContinue = () => {
        window.location.href = '/performances';
    }

    return (
        <div className="page homepage">
            <div className='homepage-title'>
                <p className="text--lg">Diventa giudice di XFactor per un giorno!</p>
            </div>

            <img src={Logo} width={200}></img>

            <div className='homepage-description'>
                <p className="text--md">Hai sempre sognato di dire "Per me è NO"?<br></br> O di scoprire il prossimo talento musicale?</p>
            </div>

            <div className='homepage-email-description'>
                <p className="text--md">Inserisci <span>la tua e-mail aziendale</span> e prova a vincere la possibilità di <br></br><span>assistere dal vivo</span> a una delle puntate della nuova edizione!</p>
            </div>

            <div className='homepage-email-box'>
                <p className='text--md'>E-mail:</p>
                <input className='input'></input>
            </div>

            <div className='homepage-action'>
                <button className='button' onClick={onContinue}>Invia e inizia il gioco!</button>
            </div>
        </div>
    );
}

export default Homepage;