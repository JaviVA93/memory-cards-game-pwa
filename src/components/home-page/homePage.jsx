
import MobileGameSvg from '../assets/mobileGameSvg'
import style from './homePage.module.css'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage() {
    const nameInput = useRef(null)
    const navigate = useNavigate();

    const startGame = () => {
        if (!nameInput.current || nameInput.current.value === '') {
            console.log('Insert your name first')
            return
        }

        navigate('/game', { state: { playerName: nameInput.current.value } });
        }

    return (
        <section className={style.home}>
            <h1>Memory Cards Game</h1>
            <MobileGameSvg className={style.mobileGameSvg} />
            <label>
                <span>Name</span>
                <input ref={nameInput} type="text" />
            </label>
            <button onClick={startGame}>Continue</button>
            <Link to='/score-board'>Score board</Link>
        </section>
    )
}