import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GamePage from "../components/game-page/gamePage";
import { INIT_CARDS_DISTRIBUTION } from "../constants/constants";



describe('HomePage Component', () => {
    it('should render', () => {
        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        )
    })

    it('should have the difficulty selector', () => {
        cleanup()

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        )

        expect(screen.getByRole('combobox'))
        expect(screen.getByText('Difficulty'))
    })

    it('should start the game after click on "Start" button', () => {
        cleanup()

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        )

        const startButton = screen.getByText('Start')
        expect(startButton)
        fireEvent.click(startButton)

        expect(() => screen.getByText('Start')).toThrow()
    })

    it('should see the cards values after when the round starts', () => {
        cleanup()

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        )

        const startButton = screen.getByText('Start')
        expect(startButton)
        fireEvent.click(startButton)

        INIT_CARDS_DISTRIBUTION.forEach( c => {
            expect(screen.getByText(c))
        })
    })

    it('should hide the cards values after 10 seconds', async () => {
        await new Promise( r => setTimeout(r, 11000))
        
        INIT_CARDS_DISTRIBUTION.forEach( c => {
            expect(() => screen.getByText(c)).toThrow()
        })
    })

    it('should reveal the card value after click on any card', () => {

        const card = screen.getAllByRole('button')[0]
        fireEvent.click(card)

        expect(card.innerText !== '').toBeTruthy()
    })

})