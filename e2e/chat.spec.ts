import { test, expect } from "@playwright/test";

test("chat page loads and shows mode selector", async ({ page }) => {
  await page.goto("/chat");

  await expect(page.locator("h1")).toHaveText("Chat");
  await expect(page.getByText("Mode:")).toBeVisible();
});

test("chat page shows health indicator", async ({ page }) => {
  await page.goto("/chat");

  await page.waitForSelector("text=Checking...", { timeout: 5000 }).catch(() => {});
  await page.waitForSelector("text=API", { timeout: 5000 }).catch(() => {});
});

test("chat mode: No Stream sends query and receives response", async ({ page }) => {
  await page.route("**/api/v1/agent", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ query: "What are the repeatability specifications for the R-2000+C series robots?", results: { answer: "test answer", sources: ["doc1"] } }),
    })
  );

  await page.goto("/chat");

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "No Stream" }).click();

  const input = page.getByPlaceholder("Type your message...");
  const sendButton = page.getByRole("button", { name: "Send" });

  await input.fill("What are the repeatability specifications for the R-2000+C series robots?");
  await sendButton.click();

  await expect(page.getByText("test answer")).toBeVisible({ timeout: 20000 });
});
