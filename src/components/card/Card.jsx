import { useEffect, useState } from "react"
import style from "./card.module.css"
import { CARD_STATES } from "../../constants/constants"

export default function Card(props) {
    const { number, state, checkNumber, blocked } = props
    const [numberRender, setNumberRender] = useState('')


    const revealCard = () => {
        if (blocked)
            return
            
        setNumberRender(number)
        checkNumber()
    }

    useEffect(() => {
        (state === CARD_STATES.HIDDEN) ? setNumberRender('') : setNumberRender(number)
    }, [state, number])

    return (
        <div className={style.card} onClick={revealCard}>
            {numberRender}
        </div>
    )
}