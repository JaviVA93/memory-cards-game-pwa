import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ScoreboardPage from "../components/scoreboard-page/ScoreboardPage";



describe('Scoreboard Component', () => {
    it('should render', () => {
        render(
            <MemoryRouter>
                <ScoreboardPage />
            </MemoryRouter>
        )
    })

    it('should have the title "Memory Cards Game"', () => {
        cleanup()
        render(
            <MemoryRouter>
                <ScoreboardPage />
            </MemoryRouter>
        )
        expect(screen.getByText('Players'))
    })

    it(`shouldn't show any data on localStorage empty`, () => {
        cleanup()
        render(
            <MemoryRouter>
                <ScoreboardPage />
            </MemoryRouter>
        )

        const scoreDataRaw = window.localStorage.getItem('scoreboard') || '[]'
        const scoreData = JSON.parse(scoreDataRaw)

        scoreData.forEach(r => {
            expect(screen.getByText(r.playerName))
        })
    })

    it(`should show the data stored on localStorage`, () => {
        const fakeData = [
            { player: "Javi", score: 100, date: "12/08/2023" },
            { player: "Test1", score: 90, date: "12/08/2023" },
            { player: "Test2", score: 70, date: "12/08/2023" },
            { player: "Test3", score: 60, date: "12/08/2023" },
            { player: "Test4", score: 50, date: "12/08/2023" },
            { player: "Test5", score: 40, date: "12/08/2023" },
        ]
        window.localStorage.setItem('scoreboard', JSON.stringify(fakeData))


        cleanup()
        render(
            <MemoryRouter>
                <ScoreboardPage />
            </MemoryRouter>
        )


        const scoreDataRaw = window.localStorage.getItem('scoreboard') || '[]'
        const scoreData = JSON.parse(scoreDataRaw)

        scoreData.forEach(r => {
            expect(screen.getAllByText(r.player))
            expect(screen.getAllByText(r.score))
            expect(screen.getAllByText(r.date))
        })
    })


})
