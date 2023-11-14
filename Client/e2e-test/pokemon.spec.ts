import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
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

  // Checks that the page contains 20 pokemons
  for (let i = 1; i < 21; i++) {
    await expect(page.getByTestId(i.toString())).toBeVisible();
  }

  // Checks that the page don't have pokemon 21
  await expect(page.getByTestId("21")).not.toBeVisible();
});

test("Checks that you can search for pikachu and show stats about it", async ({
  page,
}) => {
  // Write "pikachu" in the search bar
  await page.getByPlaceholder("pokemon name...").fill("pikachu");

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
  } else {
    test.fail();
  }

  // Checks that the page redirects back to baseURL by clicking on the "pokedex"-logo
  await page.getByTestId("ArrowBackIosNewIcon").click();
  expect(page.url()).toBe(baseURL);
});
