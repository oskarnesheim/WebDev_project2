import { render, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import FilterBox from "../FilterBox";

describe("FilterBox", () => {
    test("Checks if all filter options are rendered correctly", () => {
        const currentFilters: string[] = [];
        const setCurrentFilter = () => { };

        const { getByRole, getByText } = render(
            <FilterBox
                currentFilters={currentFilters}
                setCurrentFilter={setCurrentFilter}
            />,
        );

        fireEvent.click(getByRole("button", { name: "Filters:" }));
        const filters = [
            "normal",
            "fire",
            "water",
            "grass",
            "electric",
            "fighting",
            "poison",
            "ground",
            "flying",
            "psychic",
            "bug",
            "rock",
            "ghost",
            "dark",
            "dragon",
            "steel",
            "fairy",
            "Reset",
        ];
        filters.forEach((filter) => {
            const option = getByText(filter);
            expect(option).toBeTruthy();
        });
    });

    test("Checks if filters are applied correctly", () => {
        let currentFilters: string[] = [];
        const setCurrentFilter = (newFilters: React.SetStateAction<string[]>) => {
            if (typeof newFilters === "function") {
                currentFilters = newFilters(currentFilters);
            } else {
                currentFilters = [...currentFilters, ...newFilters];
            }
        };

        const { getByRole, getAllByText } = render(
            <FilterBox
                currentFilters={currentFilters}
                setCurrentFilter={setCurrentFilter}
            />,
        );

        fireEvent.click(getByRole("button", { name: "Filters:" }));
        const option = getAllByText("fire");
        fireEvent.click(option[1]);
        expect(currentFilters).toContain("fire");

        const option2 = getAllByText("water");
        fireEvent.click(option2[1]);
        expect(currentFilters).toContain("water");
    });
});
