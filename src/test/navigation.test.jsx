import { cleanup, render, fireEvent, screen } from "@testing-library/react"
import { it, expect, describe } from "vitest"
import { MemoryRouter } from "react-router-dom"
import App from "../App"

describe("navigation behavior", () => {
    it('should render the Home Page on "/" route', () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        expect(screen.getByText('Memory Cards Game'))
    })

    it('should render the Scoreboard Page on "/score-board" route', () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/score-board']}>
                <App />
            </MemoryRouter>
        )

        expect(screen.getByText('Players'))
        expect(screen.getByRole('table'))
    })

    it(`shouldn't render the Game Page on "/game" route accessing directly and should show the Home Page instead`, () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/game']}>
                <App />
            </MemoryRouter>
        )

        expect(() => screen.getByRole('combobox')).toThrow() // <-- Difficulty selector

        expect(screen.getByText('Memory Cards Game'))
    })

    const randomRoute = `/rand${new Date().getTime()}`
    it(`should render the Home Page on the random route "${randomRoute}"`, () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={[randomRoute]}>
                <App />
            </MemoryRouter>
        )
    })

    it('should navigate to "Scoreboard page" from "Home page" when click on "scoreboard" link', () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        const scoreboardLink = screen.getByText('Score board')
        fireEvent.click(scoreboardLink)

        expect(screen.getByRole('table'))
        expect(screen.getByText('Players'))
    })

    it('should navigate to "Game Page" from "Home page" when click on "Continue" button after introduce player name', () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'Player1' } })

        const continueButton = screen.getByText('Continue')
        fireEvent.click(continueButton)

        expect(screen.getByRole('combobox')) // <-- Difficulty selector
    })

    it(`shouldn't navigate to "Game Page" from "Home page" when click on "Continue" button without introduce player name`, () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        const continueButton = screen.getByText('Continue')
        fireEvent.click(continueButton)

        expect(() => screen.getByRole('combobox')).toThrow() // <-- Difficulty selector
    })

})