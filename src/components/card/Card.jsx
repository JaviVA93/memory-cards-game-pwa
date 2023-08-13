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
        if (state === CARD_STATES.HIDDEN) {
            setNumberRender('')
        }
        else
            setNumberRender(number)

        if (state !== CARD_STATES.RESOLVED) {
            setRevealSuccess(null)
        }

        setCardState(state)

    }, [state, number])

    return (
        <button className={getClasses()}
            disabled={blocked}
            onClick={revealCard}>
            <div className={`${style.cardFront} ${style.innerCard}`}>
                {numberRender}
            </div>
            <div className={`${style.cardBack} ${style.innerCard}`}></div>
        </button>
    )
}