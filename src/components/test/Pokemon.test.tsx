import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import Pokemon from "../Pokemon";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

describe("Pokemon", () => {
    test("Renders loading state", () => {
        const { getByTestId } = render(<Pokemon />);
        const loadingElement = getByTestId("loading-element");

        expect(loadingElement).not.toBe(null);
    });

    test("Renders error state", () => {
        // Mock error state by providing an error object
        const { getByText } = render(<Pokemon />);
        const errorElement = getByText("Error:");

        expect(errorElement).not.toBe(null);
    });

    test("Renders data state", () => {
        // Mock data state by providing data object
        const data = {
            name: "bulbasaur",
            id: 1,
        };
        const { getByText } = render(<Pokemon />);
        const nameElement = getByText("bulbasaur - #1");
        const goBackButton = getByText("Go back");
        const statsButton = getByText("Stats");
        const addToTeamButton = getByText("Add to team");

        expect(data).not.toBe(null);
        expect(nameElement).not.toBe(null);
        expect(goBackButton).not.toBe(null);
        expect(statsButton).not.toBe(null);
        expect(addToTeamButton).not.toBe(null);
    });

    // Write more tests for functions like getTeam, checkTeam, addToTeam, and verifyTeam
});
