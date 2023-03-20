// testing help
import { render, screen, waitFor } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

// to test
import TopNav from './TopNav'

describe('<TopNav>', function() {
    it("should have a home button", function() {
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Home"})
        expect(actual).not.toBeNull()
    })
    it("should have a bluetooth toggle button", function() {
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Toggle Bluetooth"})
        expect(actual).not.toBeNull()
    })
    it("should have a settings button", function() {
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Settings"})
        expect(actual).not.toBeNull()
    })
})