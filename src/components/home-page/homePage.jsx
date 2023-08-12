
import { AUDIO_STATE } from '../../constants/constants'
import MobileGameSvg from '../assets/mobileGameSvg'
import style from './homePage.module.css'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SpeakerAudioOnSvg from '../assets/speakerAudioOnSvg'
import SpeakerAudioOffSvg from '../assets/speakerAudioOffSvg'

export default function HomePage() {
    const nameInput = useRef(null)
    const navigate = useNavigate();
    const [audioState, setAudioState] = useState(AUDIO_STATE.OFF)

    const startGame = () => {
        if (!nameInput.current || nameInput.current.value === '') {
            nameInput.current.classList.add(style.shake)
            setTimeout(() => nameInput.current.classList.remove(style.shake), 1100)
            return
        }

        navigate('/game', { state: { playerName: nameInput.current.value } });
    }

    const setAudioHandle = () => {
        if (document.querySelector('#background-music').paused) {
            document.querySelector('#background-music').play()
            setAudioState(AUDIO_STATE.ON)
        }
        else {
            document.querySelector('#background-music').pause()
            setAudioState(AUDIO_STATE.OFF)
        }
    }

    useEffect(() => {
        (document.querySelector('#background-music').paused) 
            ? setAudioState(AUDIO_STATE.OFF)
            : setAudioState(AUDIO_STATE.ON)
    }, [])

    return (
        <section className={style.home}>
            <h1 className={style.title}>Memory Cards Game</h1>
            <MobileGameSvg className={style.mobileGameSvg} />
            <label className={style.nameWrapper}>
                <span>Enter your Name</span>
                <input className={style.nameInput} ref={nameInput} type="text" />
            </label>
            <button className={style.continueBtn} onClick={startGame}>Continue</button>
            <button className={style.audioBtn} onClick={setAudioHandle}>
                {(audioState === AUDIO_STATE.ON)
                    ? <SpeakerAudioOnSvg />
                    : <SpeakerAudioOffSvg />
                }
            </button>
            <Link className={style.scoreBtn} to='/score-board'>Score board</Link>
        </section>
    )
}