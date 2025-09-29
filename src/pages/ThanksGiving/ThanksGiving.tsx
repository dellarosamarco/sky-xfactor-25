import './ThanksGiving.scss';

const ThanksGiving = () => {
    return <div className="page thanksgiving">
        <div className="thanksgiving-title">
            <p className="text--lg">Grazie per aver partecipato!</p>
        </div>

        <div className="thanksgiving-email">
            <p className="text--md">Ti abbiamo inviato una copia del video per e-mail.</p>
        </div>

        <div className="thanksgiving-winners">
            <p className="text--md">Gli autori dei <span>10 feedback</span>meglio strutturati <br></br>potranno andare al prossimo live<br></br> insieme a un +1</p>
        </div>

        <div className="thanksgiving-end">
            <p className="text--md">Controlla la tua e-mail <br></br>nei prossimi giorni per sapere se hai vinto</p>
        </div>
    </div>
}

export default ThanksGiving;