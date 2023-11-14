import { test, expect } from "@playwright/test";

test("Open page and verify title", async ({ page }) => {
  await page.goto("http://localhost:5173/project2");

  expect(await page.title()).toBe("Pokedex");
});
