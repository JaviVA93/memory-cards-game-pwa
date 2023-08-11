import { MAX_SCOREBOARD_ENTRIES } from "../constants/constants";

function getCurrentDateFormatted() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function saveResultsLocally(playerName, score) {
    const scoreboardRaw = window.localStorage.getItem('scoreboard') || '[]'
    const scoreboard = JSON.parse(scoreboardRaw)

    scoreboard.push({
        player: playerName,
        score,
        date: getCurrentDateFormatted()
    })

    scoreboard.sort((a, b) => b.score - a.score)
    if (scoreboard.length > MAX_SCOREBOARD_ENTRIES)
        scoreboard.splice(MAX_SCOREBOARD_ENTRIES)

    window.localStorage.setItem('scoreboard', JSON.stringify(scoreboard))
}