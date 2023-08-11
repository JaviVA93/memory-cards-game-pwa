import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import HomePage from "../components/home-page/homePage"
import { BrowserRouter } from "react-router-dom";



describe('HomePage', () => {
    it('should render', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
    })

    it('should have the title "Memory Cards Game"', () => {
        cleanup()
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
        screen.getByText('Memory Cards Game')
    })
})