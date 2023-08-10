
import MobileGameSvg from '../assets/mobileGameSvg'
import style from './homePage.module.css'
import { useRef } from 'react'

export default function HomePage(props) {
    const { goToGamePage, goToScoreBoard } = props
    const nameInput = useRef(null)
    const startGame = () => {
        if (!nameInput.current || nameInput.current.value === '') {
            console.log('Insert your name first')
            return
        }

        goToGamePage(nameInput.current.value)
    }

    return (
        <section className={style.home}>
            <h1>Memory Cards Game</h1>
            <MobileGameSvg className={style.mobileGameSvg} />
            <label>
                <span>Name</span>
                <input ref={nameInput} type="text" />
            </label>
            <button type='button' onClick={startGame}>Continue</button>
            <button type='button' onClick={goToScoreBoard}>Score board</button>
        </section>
    )
}