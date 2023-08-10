import { useEffect, useState } from "react"
import style from "./card.module.css"
import { CARD_STATES } from "../../constants/constants"

export default function Card(props) {
    const { number, state } = props
    const [numberRender, setNumberRender] = useState(number)

    useEffect(() => {
        (state === CARD_STATES.HIDDEN) ? setNumberRender('') : setNumberRender(number)
    }, [state])

    return (
        <div className={style.card}>
            {numberRender}
        </div>
    )
}