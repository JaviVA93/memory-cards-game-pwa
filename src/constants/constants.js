
export const CARD_STATES = {
    HIDDEN: 'hidden',
    VISIBLE: 'visible',
    RESOLVED: 'resolved'
}

export const BOARD_STATES = {
    WATCHING: 'watching',
    PLAYING: 'playing',
    ENDED: 'ended',
    BETWEEN_ROUNDS: 'betweenrounds',
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

export const GAME_PAGE_TITLES = {
    WATCHING: 'Where is the number {{number}}',
    CONGRATULATIONS: 'Good job!',
    NICE_TRY: 'Oh, nice try...',
    MEMORIZE: 'Memorize the cards'
}

export const GAME_PAGE_END_TITLE = 'You did {{score}} points!'

export const GAME_PAGE_BUTTON_TEXTS = {
    START: 'Start',
    TRY_AGAIN: 'Start again',
    NEXT_ROUND: 'Next round',
}

export const MAX_SCOREBOARD_ENTRIES = 10

export const INIT_CARDS_DISTRIBUTION = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const AUDIO_STATE = {
    ON: 'on',
    OFF: 'off'
}