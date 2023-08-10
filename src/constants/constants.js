
export const CARD_STATES = {
    HIDDEN: 'hidden',
    VISIBLE: 'visible'
}

export const BOARD_STATES = {
    WATCHING: 'watching',
    PLAYING: 'playing',
    ENDED: 'ended',
    INITIAL: 'init'
}

export const DIFFICULTY_STATS = {
    EASY: {
        ID: 'e',
        TIME: 10,
        TEXT: 'Easy',
        POINTS: 10
    },
    MEDIUM: {
        ID: 'm',
        TIME: 5,
        TEXT: 'Medium',
        POINTS: 20
    },
    HARD: {
        ID: 'h',
        TIME: 2,
        TEXT: 'Hard',
        POINTS: 30
    },
}


export const INIT_CARDS_DISTRIBUTION = [1, 2, 3, 4, 5, 6, 7, 8, 9]