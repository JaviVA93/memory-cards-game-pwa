import { useEffect, useState } from "react"
import style from "./card.module.css"
import { CARD_STATES } from "../../constants/constants"

export default function Card(props) {
    const { number, state, checkNumber, blocked } = props
    const [numberRender, setNumberRender] = useState('')
    const [cardState, setCardState] = useState()
    const [revealSuccess, setRevealSuccess] = useState(null)


    const revealCard = () => {
        if (blocked)
            return

        setCardState(CARD_STATES.VISIBLE)
        setNumberRender(number)
        const revealResult = checkNumber(number)
        setRevealSuccess(revealResult)
    }

    const getClasses = () => {
        let classes = style.card
        if (cardState === CARD_STATES.HIDDEN)
            classes += ` ${style.hidden}`

        if (revealSuccess === true)
            classes += ` ${style.revealSuccess}`

        if (revealSuccess === false)
            classes += ` ${style.revealError}`

        return classes
    }

    useEffect(() => {
        (state === CARD_STATES.HIDDEN) ? setNumberRender('') : setNumberRender(number)
        setCardState(state)
        setRevealSuccess(null)
    }, [state, number])

    return (
        <button className={getClasses()}
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