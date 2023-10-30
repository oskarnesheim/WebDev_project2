import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import Pokemon from "../Pokemon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Pokemon Component", () => {
    test("Renders the pokemon page component", async () => {
        const queryClient = new QueryClient(); // Create a QueryClient instance

        const { getByText } = render(
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter initialEntries={["/pokemon/1"]}>
                        <Routes>
                            <Route path="/pokemon/:id" element={<Pokemon />} />
                        </Routes>
                    </MemoryRouter>
                </QueryClientProvider>
            </RecoilRoot>
        );

        //Check if the pokemon page renders properly
        const back_button = window.location.href;
        userEvent.click(getByText("Go back"));
        expect(back_button == window.location.href).toBeTruthy();
        const statsLabel = getByText("Stats");
        expect(statsLabel).not.toBe(null);
        const addToTeamButton = getByText("Add to Team");
        expect(addToTeamButton).not.toBe(null);
        userEvent.click(addToTeamButton);
        const alreadyInTeamLabel = getByText("Already in Team");
        expect(alreadyInTeamLabel).not.toBe(null);

    });
});