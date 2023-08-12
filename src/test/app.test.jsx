import { render } from "@testing-library/react";
import { describe, it } from "vitest";
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

})