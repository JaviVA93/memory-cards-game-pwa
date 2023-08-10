
import { useState } from 'react'
import style from './gamePage.module.css'
import CardsTable from '../cards-table/CardsTable'
import { BOARD_STATES, DIFFICULTY_STATS } from '../../constants/constants'
import { randomIntFromInterval } from '../../utils/utils'

export default function GamePage(props) {
    const { playerName, goToHomePage } = props
    const [title, setTitle] = useState('Memoryze the cards')
    const [boardState, setBoardState] = useState(BOARD_STATES.INITIAL)
    const [countdownRender, setCountdownRender] = useState()
    const [difficulty, setDifficulty] = useState(DIFFICULTY_STATS.EASY)


    const updateToFindState = () => {
        setBoardState(BOARD_STATES.PLAYING)
        const num = randomIntFromInterval(1, 9)
        setTitle(`Where is the number ${num}`)
    }

    const startCountDown = (maxTime) => {

        setCountdownRender(maxTime)
        const interval = setInterval(() => {
            maxTime--
            setCountdownRender(maxTime)
            if (maxTime <= 0) {
                setCountdownRender()
                updateToFindState()
                clearInterval(interval)
            }
        }, 1000)
    }

    const startGame = () => {
        setBoardState(BOARD_STATES.WATCHING)

        startCountDown(difficulty.TIME)
    }

    const changeDifficulty = (newDifficulty) => {
        const key = Object.keys(DIFFICULTY_STATS).find(key => DIFFICULTY_STATS[key].TEXT === newDifficulty)
        setDifficulty(DIFFICULTY_STATS[key])
        console.log(DIFFICULTY_STATS[key])
    }

    return (
        <section className={style.gamePage}>
            <button type='button' onClick={goToHomePage}>Back to Title Screen</button>
            <span>{playerName}</span>
            <label className={style.difficultyWrapper} onChange={e => changeDifficulty(e.target.value)}>
                Difficulty
                <select>
                    <option value={DIFFICULTY_STATS.EASY.TEXT}>{DIFFICULTY_STATS.EASY.TEXT}</option>
                    <option value={DIFFICULTY_STATS.MEDIUM.TEXT}>{DIFFICULTY_STATS.MEDIUM.TEXT}</option>
                    <option value={DIFFICULTY_STATS.HARD.TEXT}>{DIFFICULTY_STATS.HARD.TEXT}</option>
                </select>
            </label>
            <h1>{title}</h1>
            {
                (countdownRender)
                    ? <h2>{countdownRender}</h2>
                    : ''
            }
            <CardsTable boardState={boardState} />
            {
                (boardState === BOARD_STATES.INITIAL)
                    ? <button type='button' onClick={startGame}>Play</button>
                    : ''
            }
        </section>
    )
}