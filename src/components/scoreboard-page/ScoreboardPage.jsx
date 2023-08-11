import { Link } from "react-router-dom"
import style from "./scoreboardPage.module.css"
import BackArrowSvg from "../assets/backArrowSvg"

export default function ScoreboardPage() {
    const scoreDataRaw = window.localStorage.getItem('scoreboard') || '[]'
    const scoreData = JSON.parse(scoreDataRaw)

    return (
        <section className={style.scoreBoard}>
            <Link className={style.quitMenu} to='/'>
                <BackArrowSvg className={style.backArrow}/>
            </Link>
            <h1>Players</h1>
            <table>
                <tbody>
                    {scoreData.map((data, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td className={style.playerName}>{data.player}</td>
                                <td className={style.date}>{data.date}</td>
                                <td className={style.score}>{data.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}