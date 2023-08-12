
import { useState, useRef, useEffect } from 'react'
import style from './gamePage.module.css'
import { BOARD_STATES, DIFFICULTY_STATS, CARD_STATES, INIT_CARDS_DISTRIBUTION, GAME_PAGE_TITLES } from '../../constants/constants'
import { randomIntFromInterval, saveResultsLocally, shuffleArray } from '../../utils/utils'
import Card from '../card/Card'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackArrowSvg from '../assets/backArrowSvg'

export default function GamePage() {
    const [title, setTitle] = useState('Memorize the cards')
    const [boardState, setBoardState] = useState(BOARD_STATES.INITIAL)
    const [countdownRender, setCountdownRender] = useState()
    const [difficulty, setDifficulty] = useState(DIFFICULTY_STATS.EASY)
    const [cardsDistribution, setCardsDistribution] = useState(INIT_CARDS_DISTRIBUTION)
    const [buttonText, setButtonText] = useState('Start')
    const [pointsTextOnEnd, setPointsTextOnEnd] = useState()
    const [score, setScore] = useState(0)
    const [playerName, setPlayerName] = useState('')
    const numberToFind = useRef(null)
    const { state } = useLocation();
    const navigate = useNavigate();


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
        setPointsTextOnEnd()
    }

    const changeDifficulty = (newDifficulty) => {
        const key = Object.keys(DIFFICULTY_STATS).find(key => DIFFICULTY_STATS[key].ID === newDifficulty)
        setDifficulty(DIFFICULTY_STATS[key])
    }

    const checkNumber = (value) => {
        setBoardState(BOARD_STATES.BETWEEN_ROUNDS)
        if (value === numberToFind.current) {
            setTitle(GAME_PAGE_TITLES.CONGRATULATIONS)
            setScore(score + difficulty.POINTS)
            // setBoardState(BOARD_STATES.INITIAL)
            setButtonText('Next round')
            window.navigator?.vibrate?.([125, 75, 125])
            return true
        }

        saveResultsLocally(playerName, score)
        setTitle(GAME_PAGE_TITLES.NICE_TRY)
        setPointsTextOnEnd(`You did ${score} points!`)
        setScore(0)
        setBoardState(BOARD_STATES.ENDED)
        setButtonText('Start again')
        window.navigator?.vibrate?.(1000)
        return false

    }

    const getCardState = () => {
        if (boardState === BOARD_STATES.WATCHING)
            return CARD_STATES.VISIBLE
        else if (boardState === BOARD_STATES.BETWEEN_ROUNDS || boardState === BOARD_STATES.ENDED)
            return CARD_STATES.RESOLVED
        
        return CARD_STATES.HIDDEN
    }

    const disableDifficultySelector = () => {
        return (boardState === BOARD_STATES.INITIAL || boardState === BOARD_STATES.ENDED)
            ? false
            : true
    }

    useEffect(() => {
        if (state?.playerName)
            setPlayerName(state.playerName)
        else
            navigate('/')
    }, [])

    return (
        <section className={style.gamePage}>
            <div className={style.topInfo}>
                <div className={style.left}>
                    <Link className={style.quitMenu} to='/'>
                        <BackArrowSvg />
                    </Link>
                    <span>Points: {score}</span>
                </div>
                <div className={style.right}>
                    <span>Player: {playerName}</span>
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
                </div>
            </div>
            <h1 className={style.title}>
                {title}
            </h1>
            {
                pointsTextOnEnd ? <h2>{pointsTextOnEnd}</h2> : ''
            }
            {
                (countdownRender)
                    ? <h2>{countdownRender}</h2>
                    : <div className={style.emptySpace}></div>
            }
            <div className={style.cardsTable}>
                {cardsDistribution.map((value, index) => {
                    return (
                        <Card key={`${index}-id`}
                            number={value}
                            state={getCardState()}
                            blocked={(boardState === BOARD_STATES.PLAYING) ? false : true}
                            checkNumber={checkNumber} />
                    )
                })}
                {
                    (boardState !== BOARD_STATES.WATCHING && boardState !== BOARD_STATES.PLAYING)
                        ? <button className={style.mainCta} type='button' onClick={startGame}>
                            {buttonText}
                        </button>
                        : ''
                }
            </div>
        </section>
    )
}