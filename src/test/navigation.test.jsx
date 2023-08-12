import { cleanup, render, fireEvent, screen } from "@testing-library/react"
import { it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import App from "../App"

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
    fireEvent.change(input, {target: {value: 'Player1'}})

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

    expect( () => screen.getByRole('combobox')).toThrow() // <-- Difficulty selector
})
