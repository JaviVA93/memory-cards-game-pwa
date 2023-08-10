import { Link } from "react-router-dom"

export default function ScoreboardPage() {
    const scoreData = window.localStorage.getItem('scoreboard') || ''

    return (
        <section>
            <span>
                {scoreData}
            </span>
            <Link to='/'>Back home</Link>
        </section>
    )
}