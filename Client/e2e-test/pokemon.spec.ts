import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Checks that the navigation works correctly", async ({ page }) => {
  // Gets the baseURL
  const baseURL = page.url();
  const windowSize = page.viewportSize()?.width || 1000;
  // Only checks the navigation if the navbar is visible
  if (windowSize > 700) {
    // Cheks that the "Myteam" button navigates correctly
    await page.getByTestId("myteam_link_button").click();
    expect(page.url()).toBe(baseURL + "/myteam");

    // Cheks that the "About" button navigates correctly
    await page.getByTestId("about_link_button").click();
    expect(page.url()).toBe(baseURL + "/about");

    // Cheks that the "Pokedex" button navigates correctly
    await page.getByTestId("pokedex_link_button").click();
    expect(page.url()).toBe(baseURL);
  }
});

test("Checks that the page render correctly with 20 pokemons", async ({
  page,
}) => {
  // Checks that the page title is "Pokedex"
  expect(await page.title()).toBe("Pokedex");

  // Checks that the page contains the correct navbar
  const windowSize = page.viewportSize()?.width || 1000;
  if (windowSize > 700) {
    await expect(page.getByTestId("navbar")).toBeVisible();
    await expect(page.getByTestId("hamburger_menu")).not.toBeVisible();
  } else {
    await expect(page.getByTestId("navbar")).not.toBeVisible();
    await expect(page.getByTestId("hamburger_menu")).toBeVisible();
  }

  // Checks that the page contains the search bar
  await expect(page.getByTestId("search-bar")).toBeVisible();

  // Checks that the page contains filter-box
  await expect(page.getByTestId("filter_button")).toBeVisible();

  // Checks that the page contains the pagination
  await expect(page.getByTestId("pagination")).toBeVisible();

  // Checks that the page contains the 20 first pokemons (sorted by id)
  for (let i = 1; i < 21; i++) {
    await expect(page.getByTestId(i.toString())).toBeVisible();
  }

  // Checks that the page don't have pokemon 21
  await expect(page.getByTestId("21")).not.toBeVisible();

  // Checks that there are 15 pages in the pagination
  await expect(page.getByTestId("pagination")).toContainText("12345…15");
});

test("Checks that sorting and filtering works correctly", async ({ page }) => {
  // Checks that the modal is not visible before clicking on the filter-box
  await expect(page.getByTestId("filter-box-modal")).not.toBeVisible();
  // Opens the filter-box and checks that it is visible
  await page.getByTestId("filter_button").click();
  await expect(page.getByTestId("filter-box-modal")).toBeVisible();

  // Apply "fire" and "water" filter
  await page.getByTestId("filter-list-button").click();
  await page.getByTestId("fire").click();
  await page.getByTestId("water").click();

  // Clicks the esc button to close the modal
  await page.keyboard.press("Escape");

  // Apply "kg increasing" filter
  await page.getByTestId("sort-list-button").click();
  await page.getByTestId("kg increasing").click();

  // Applys the filters
  await page.getByTestId("apply-filter-button").click();

  // IDs of the pokemons that should be visible
  const pokemonIDs = [
    283, 255, 270, 211, 90, 222, 98, 138, 258, 155, 116, 4, 194, 183, 7, 278,
    158, 37, 129, 228,
  ];

  // Checks that the page contains only the correct pokemons
  for (let i = 1; i < 301; i++) {
    if (pokemonIDs.includes(i)) {
      await expect(page.getByTestId(i.toString())).toBeVisible();
    } else {
      await expect(page.getByTestId(i.toString())).not.toBeVisible();
    }
  }

  // Checks that there are 5 pages in the pagination
  await expect(page.getByTestId("pagination")).toContainText("12345");
});

test("Checks that you can search for pikachu and show stats about it", async ({
  page,
}) => {
  // Write "pikachu" in the search bar
  await page.getByPlaceholder("type in pokemon name to search").fill("pikachu");

  // Checks that pikachu is visible (id: 25)
  await expect(page.getByTestId("25")).toBeVisible();

  // Gets the baseURL
  const baseURL = page.url();

  // Click on pikachu and check that it redirects to the correct page
  await page.getByTestId("25").click();
  expect(page.url()).toBe(baseURL + "/25");

  // Checks that the page contains stats for pikachu
  expect(await page.getByTestId("pokemon-stats-title").textContent()).toBe(
    "Stats for pikachu",
  );

  // Select the image by its test ID
  const image = await page.$('[data-testid="pokemon-stats-image"]');

  // Check if the image is on the page
  expect(image).toBeTruthy();

  // Get the alt-text of the image (if there is one)
  if (image) {
    const altText = await image.getAttribute("alt");
    // Check that the alt-text is correct
    expect(altText).toBe("Picture of pikachu");
  }

  // Checks that the page redirects back to baseURL by clicking on the "pokedex"-logo
  await page.getByTestId("ArrowBackIosNewIcon").click();
  expect(page.url()).toBe(baseURL);
});

test("Checks that you get response when searching for a pokemon that doesn't exist", async ({
  page,
}) => {
  // Checks that the text "No pokemons found" is not visible by default
  await expect(page.getByTestId("Error_message_no_pokemons")).not.toBeVisible();

  // Write "No pokemon with this name" in the search bar
  await page
    .getByPlaceholder("type in pokemon name to search")
    .fill("No pokemon with this name");

  // Checks that the text "No pokemons found" is visible
  await expect(page.getByTestId("Error_message_no_pokemons")).toBeVisible();
});

test("Checks that the team-functionality works correctly", async ({ page }) => {
  // Checks that the team is empty by default
  await page.goto("/project2/myteam/");
  await expect(page.getByTestId("Empty_team_message")).toBeVisible();

  await page.goto("/");

  // Adds the first 6 pokemons to the team
  for (let i = 1; i < 7; i++) {
    await page.getByTestId(i.toString()).click();

    // Checks that the pokemon have the option to be added to the team
    expect(await page.getByTestId("add_to_team_button").textContent()).toBe(
      "Add to team",
    );
    await page.getByTestId("add_to_team_button").click();
    expect(await page.getByTestId("add_to_team_button").textContent()).toBe(
      "Remove from team",
    );

    // Navigates back to the home page
    await page.goto("/");
  }

  // Checks that its not possible to add a 7th pokemon to the team
  await page.getByTestId("7").click();
  expect(await page.getByTestId("add_to_team_button").textContent()).toBe(
    "Team is full",
  );
  await page.goto("/");

  // Checks that the team contains the correct pokemons
  await page.goto("/project2/myteam/");
  await expect(page.getByTestId("Empty_team_message")).not.toBeVisible();

  for (let i = 1; i < 7; i++) {
    expect(page.getByTestId(i.toString()));
    // Navigates to the next pokemon in the team
    await page.getByTestId("right_button_team").click();
  }

  // Removes every pokemon from the team to make it empty again
  for (let i = 1; i < 7; i++) {
    await page.getByTestId("remove_from_team_button").click();
  }

  // Checks that the team is empty
  await expect(page.getByTestId("Empty_team_message")).toBeVisible();
});
