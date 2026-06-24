import { test, expect } from "@playwright/test";

test("home page loads with hero and features", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveText("Build Something Amazing");
  await expect(page.getByRole("link", { name: "Get Started" }).first()).toBeVisible();
  await expect(page.locator("text=RAG Chat")).toBeVisible();
});

test("Get Started link navigates to /chat", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Get Started" }).first().click();
  await expect(page).toHaveURL("/chat");
});
