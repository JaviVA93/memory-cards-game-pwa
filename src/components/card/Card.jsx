import { useEffect, useState } from "react"
import style from "./card.module.css"
import { CARD_STATES } from "../../constants/constants"

export default function Card(props) {
    const { number, state, checkNumber, blocked } = props
    const [numberRender, setNumberRender] = useState('')
    const [cardState, setCardState] = useState()


    const revealCard = () => {
        if (blocked)
            return
        
        setCardState(CARD_STATES.VISIBLE)
        setNumberRender(number)
        checkNumber()
    }

    useEffect(() => {
        (state === CARD_STATES.HIDDEN) ? setNumberRender('') : setNumberRender(number)
        setCardState(state)
    }, [state, number])

    return (
        <button className={`${style.card} ${(cardState === CARD_STATES.HIDDEN) ? style.hidden : ''}`}
            onClick={revealCard}>
            <div className={style.innerCard}>
                <div className={style.cardFront}>
                    {numberRender}
                </div>
                <div className={style.cardBack}>
                </div>
            </div>
        </button>
    )
}