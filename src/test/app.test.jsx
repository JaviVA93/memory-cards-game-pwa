import { cleanup, screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";
import { MemoryRouter } from "react-router-dom";


describe('App Component', () => {
    it('should render', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
    })

    it('should render the Home Page on "/" route', () => {
        cleanup()

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        expect(screen.getByText('Memory Cards Game'))
    })
})