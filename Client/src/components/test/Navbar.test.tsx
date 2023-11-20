import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../navbar/navbar";
import HamburgerMenu from "../navbar/HamburgerMenu.tsx";
import { RecoilRoot } from "recoil";

describe("Navbar", () => {
  test("Navbar component renders", () => {
    const { queryByText } = render(
      <BrowserRouter>
        <RecoilRoot>
          <Navbar />
        </RecoilRoot>
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
        <RecoilRoot>
          <Navbar />
        </RecoilRoot>
      </BrowserRouter>,
    );

    const pokedexLink = getAllByText("Pokedex")[0];
    const myTeamLink = getAllByText("My Team")[0];

    pokedexLink.click();
    expect(location.pathname).toBe("/");
    myTeamLink.click();
    expect(location.pathname).toBe("/myteam");
  });

  test("Snapshot test of navbar and hamburger menu", () => {
    const navbar = render(
      <BrowserRouter>
        <RecoilRoot>
          <Navbar />
        </RecoilRoot>
      </BrowserRouter>,
    );
    expect(navbar).toMatchSnapshot();

    const hamburger = render(
      <BrowserRouter>
        <RecoilRoot>
          <HamburgerMenu />
        </RecoilRoot>
      </BrowserRouter>,
    );
    expect(hamburger).toMatchSnapshot();
  });

  test("Test hamburger meny", () => {
    const page = render(
      <BrowserRouter>
        <RecoilRoot>
          <HamburgerMenu />
        </RecoilRoot>
      </BrowserRouter>,
    );

    const menu_button = page.getAllByTestId("hamburger_menu")[0];

    menu_button.click();

    // Checks that the menu displays the 3 links
    const pokedexLink = page.getAllByTestId("pokedex_link_button")[0];
    expect(pokedexLink).toBeTruthy();
    const myTeamLink = page.getAllByTestId("myteam_link_button")[0];
    expect(myTeamLink).toBeTruthy();
    const aboutLink = page.getAllByTestId("about_link_button")[0];
    expect(aboutLink).toBeTruthy();

    // Checks that the links navigate correctly
    pokedexLink.click();
    expect(location.pathname).toBe("/");
    myTeamLink.click();
    expect(location.pathname).toBe("/myteam");
    aboutLink.click();
    expect(location.pathname).toBe("/about");
  });
});
