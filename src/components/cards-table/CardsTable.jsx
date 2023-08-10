import Card from "../card/Card";
import style from "./cardsTable.module.css"
import { BOARD_STATES, CARD_STATES } from "../../constants/constants";

export default function CardsTable(props) {
    const { boardState } = props;
    const cardsDistribution = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(boardState)
    return (
        <div className={style.cardsTable}>
            {cardsDistribution.map(value => <Card key={value} number={value} state={(boardState === BOARD_STATES.WATCHING) ? CARD_STATES.VISIBLE : CARD_STATES.HIDDEN } />)}
        </div>
    )

}