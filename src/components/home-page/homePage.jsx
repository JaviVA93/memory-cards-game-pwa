
import MobileGameSvg from '../assets/mobileGameSvg'
import style from './homePage.module.css'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage() {
    const nameInput = useRef(null)
    const navigate = useNavigate();

    const startGame = () => {
        if (!nameInput.current || nameInput.current.value === '') {
            nameInput.current.classList.add(style.shake)
            setTimeout(() => nameInput.current.classList.remove(style.shake), 1100)
            return
        }

        navigate('/game', { state: { playerName: nameInput.current.value } });
        }

    return (
        <section className={style.home}>
            <h1 className={style.title}>Memory Cards Game</h1>
            <MobileGameSvg className={style.mobileGameSvg} />
            <label className={style.nameWrapper}>
                <span>Enter your Name</span>
                <input className={style.nameInput} ref={nameInput} type="text" />
            </label>
            <button className={style.continueBtn} onClick={startGame}>Continue</button>
            <Link className={style.scoreBtn} to='/score-board'>Score board</Link>
        </section>
    )
}