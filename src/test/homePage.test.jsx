import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../components/home-page/homePage"
import { MemoryRouter } from "react-router-dom";



describe('HomePage Component', () => {
    it('should render', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <HomePage />
            </MemoryRouter>
        )
    })

    it('should have the title "Memory Cards Game"', () => {
        cleanup()
        render(
            <MemoryRouter initialEntries={["/"]}>
                <HomePage />
            </MemoryRouter>
        )
        expect(screen.getByText('Memory Cards Game'))
    })

    
})