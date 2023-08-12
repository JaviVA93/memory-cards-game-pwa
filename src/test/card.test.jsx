
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "../components/card/Card";
import { CARD_STATES } from "../constants/constants";


describe('Card Component', () => {

    it('should render', () => {
        render(<Card />)
    })

    it(`should has the value passed on props when the card state is "${CARD_STATES.VISIBLE}"`, () => {
        cleanup()
        const props = {
            number: 3,
            state: CARD_STATES.VISIBLE,
            checkNumber: () => { },
            blocked: true
        }

        render(<Card {...props} />)
        expect(screen.getByText('3'))
    })

    it(`should hasn't the value passed on props when the card state is "${CARD_STATES.HIDDEN}"`, () => {
        cleanup()
        const props = {
            number: 3,
            state: CARD_STATES.HIDDEN,
            checkNumber: () => { },
            blocked: true
        }

        render(<Card {...props} />)
        expect( () => screen.getByText('3')).toThrow()
    })

    it('should flip the card showing the value', () => {
        cleanup()
        const props = {
            number: 3,
            state: CARD_STATES.HIDDEN,
            checkNumber: () => { },
            blocked: false
        }

        render(<Card {...props} />)

        expect(() => screen.getByText('3')).toThrow()

        const card = screen.getByRole('button')
        fireEvent.click(card)

        expect(screen.getByText('3'))
    })

    it(`should not flip the card if it's blocked`, () => {
        cleanup()
        const props = {
            number: 3,
            state: CARD_STATES.HIDDEN,
            checkNumber: () => { },
            blocked: true
        }

        render(<Card {...props} />)

        expect(() => screen.getByText('3')).toThrow()

        const card = screen.getByRole('button')
        fireEvent.click(card)

        expect(() => screen.getByText('3')).toThrow()
    })

})