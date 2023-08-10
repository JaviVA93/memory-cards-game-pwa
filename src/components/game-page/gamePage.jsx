
import { useState, useRef } from 'react'
import style from './gamePage.module.css'
import { BOARD_STATES, DIFFICULTY_STATS, CARD_STATES, INIT_CARDS_DISTRIBUTION, GAME_PAGE_TITLES } from '../../constants/constants'
import { randomIntFromInterval, saveResultsLocally, shuffleArray } from '../../utils/utils'
import Card from '../card/Card'
import { Link, useLocation } from 'react-router-dom'

export default function GamePage() {
    const [title, setTitle] = useState('Memorize the cards')
    const [boardState, setBoardState] = useState(BOARD_STATES.INITIAL)
    const [countdownRender, setCountdownRender] = useState()
    const [difficulty, setDifficulty] = useState(DIFFICULTY_STATS.EASY)
    const [cardsDistribution, setCardsDistribution] = useState(INIT_CARDS_DISTRIBUTION)
    const [score, setScore] = useState(0)
    const numberToFind = useRef(null)

    const {state} = useLocation();
    const { playerName } = state;


    const updateToFindState = () => {
        setBoardState(BOARD_STATES.PLAYING)
        const num = randomIntFromInterval(1, 9)
        const title = GAME_PAGE_TITLES.WATCHING.replace('{{number}}', num.toString())
        setTitle(title)
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
        setTitle(GAME_PAGE_TITLES.MEMORIZE)
    }

    const changeDifficulty = (newDifficulty) => {
        const key = Object.keys(DIFFICULTY_STATS).find(key => DIFFICULTY_STATS[key].ID === newDifficulty)
        setDifficulty(DIFFICULTY_STATS[key])
    }

    const checkNumber = (value) => {
        if (value === numberToFind.current) {
            setTitle(GAME_PAGE_TITLES.CONGRATULATIONS)
            setScore(score + difficulty.POINTS)
            setBoardState(BOARD_STATES.INITIAL)
        }
        else {
            saveResultsLocally(playerName, score)
            setTitle(GAME_PAGE_TITLES.NICE_TRY)
            setBoardState(BOARD_STATES.ENDED)
        }
    }

    const disableDifficultySelector = () => {
        return (boardState === BOARD_STATES.INITIAL || boardState === BOARD_STATES.ENDED)
            ? false
            : true
    }


    return (
        <section className={style.gamePage}>
            <Link to='/'>Back to Title Screen</Link>
            <span>Player: {playerName}</span>
            <span>Points: {score}</span>
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
                        {(boardState === BOARD_STATES.INITIAL) ? 'Play' : 'Start again'}
                    </button>
                    : ''
            }
        </section>
    )
}