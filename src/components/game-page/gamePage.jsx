
import { useState, useRef } from 'react'
import style from './gamePage.module.css'
import { BOARD_STATES, DIFFICULTY_STATS, CARD_STATES, INIT_CARDS_DISTRIBUTION } from '../../constants/constants'
import { randomIntFromInterval, shuffleArray } from '../../utils/utils'
import Card from '../card/Card'

export default function GamePage(props) {
    const { playerName, goToHomePage } = props
    const [title, setTitle] = useState('Memorize the cards')
    const [boardState, setBoardState] = useState(BOARD_STATES.INITIAL)
    const [countdownRender, setCountdownRender] = useState()
    const [difficulty, setDifficulty] = useState(DIFFICULTY_STATS.EASY)
    const [cardsDistribution, setCardsDistribution] = useState(INIT_CARDS_DISTRIBUTION)
    const [points, setPoints] = useState(0)
    const numberToFind = useRef(null)


    const updateToFindState = () => {
        setBoardState(BOARD_STATES.PLAYING)
        const num = randomIntFromInterval(1, 9)
        setTitle(`Where is the number ${num}`)
        numberToFind.current = num
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
        const shuffledCards = shuffleArray(INIT_CARDS_DISTRIBUTION)
        setCardsDistribution(shuffledCards)
        setBoardState(BOARD_STATES.WATCHING)
        startCountDown(difficulty.TIME)
        setTitle('Memorize the cards')
    }

    const changeDifficulty = (newDifficulty) => {
        const key = Object.keys(DIFFICULTY_STATS).find(key => DIFFICULTY_STATS[key].ID === newDifficulty)
        setDifficulty(DIFFICULTY_STATS[key])
    }

    const checkNumber = (value) => {
        if (value === numberToFind.current) {
            setPoints(points + difficulty.POINTS)
            setBoardState(BOARD_STATES.INITIAL)
        }
        else
            setBoardState(BOARD_STATES.ENDED)
    }

    const disableDifficultySelector = () => {
        return (boardState === BOARD_STATES.INITIAL || boardState === BOARD_STATES.ENDED)
            ? false
            : true
    }

    return (
        <section className={style.gamePage}>
            <button type='button' onClick={goToHomePage}>Back to Title Screen</button>
            <span>Player: {playerName}</span>
            <span>Points: {points}</span>
            <label className={style.difficultyWrapper} onChange={e => changeDifficulty(e.target.value)}>
                Difficulty
                <select disabled={disableDifficultySelector()}>
                    <option value={DIFFICULTY_STATS.EASY.ID}>
                        {DIFFICULTY_STATS.EASY.TEXT} +{DIFFICULTY_STATS.EASY.POINTS}
                    </option>
                    <option value={DIFFICULTY_STATS.MEDIUM.ID}>
                        {DIFFICULTY_STATS.MEDIUM.TEXT} +{DIFFICULTY_STATS.MEDIUM.POINTS}</option>
                    <option value={DIFFICULTY_STATS.HARD.ID}>
                        {DIFFICULTY_STATS.HARD.TEXT} +{DIFFICULTY_STATS.HARD.POINTS}
                    </option>
                </select>
            </label>
            <h1>{title}</h1>
            {
                (countdownRender)
                    ? <h2>{countdownRender}</h2>
                    : ''
            }
            <div className={style.cardsTable}>
                {cardsDistribution.map(value => {
                    return (
                        <Card key={value}
                            number={value}
                            state={(boardState === BOARD_STATES.WATCHING) ? CARD_STATES.VISIBLE : CARD_STATES.HIDDEN}
                            blocked={(boardState === BOARD_STATES.PLAYING) ? false : true}
                            checkNumber={() => checkNumber(value)} />
                    )
                })}
            </div>
            {
                (boardState === BOARD_STATES.INITIAL || boardState === BOARD_STATES.ENDED)
                    ? <button type='button' onClick={startGame}>
                        {(BOARD_STATES.INITIAL) ? 'Play' : 'Try again'}
                    </button>
                    : ''
            }
        </section>
    )
}