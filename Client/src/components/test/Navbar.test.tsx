import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../navbar/navbar";

describe("Navbar", () => {
  test("Navbar component renders", () => {
    const { queryByText } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    const pokedexLink = queryByText("Pokedex");
    expect(pokedexLink).not.toBe(null);
    const myTeamLink = queryByText("My Team");
    expect(myTeamLink).not.toBe(null);
  });

  test("Navbar links navigate correctly", async () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    const pokedexLink = getAllByText("Pokedex")[0];
    const myTeamLink = getAllByText("My Team")[0];

    pokedexLink.click();
    expect(location.pathname).toBe("/");
    myTeamLink.click();
    expect(location.pathname).toBe("/myteam");
  });
});
