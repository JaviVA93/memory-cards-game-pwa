
import style from './gamePage.module.css'

export default function GamePage(props) {
    const { playerName, goToHomePage } = props

    return (
        <section className={style.gamePage}>
            <button type='button' onClick={goToHomePage}>Back to Title Screen</button>
            <h1>Game Page</h1>
            <span>{playerName}</span>
        </section>
    )
}