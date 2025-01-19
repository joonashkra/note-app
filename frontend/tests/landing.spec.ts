import { test, expect } from "@playwright/test";

test.describe("landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should render header", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "NoteApp",
      }),
    ).toBeVisible();
  });

  test("should render README.md", async ({ page }) => {
    await expect(page.getByText("Note / To-Do Web Application")).toBeVisible();
  });

  test("should redirect from navbar links", async ({ page }) => {
    await page.getByRole("link", { name: "Overview" }).click();
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();

    await page.getByRole("link", { name: "Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Log in to NoteApp" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Sign Up" }).click();
    await expect(
      page.getByRole("heading", { name: "Create your account" }),
    ).toBeVisible();
  });
});
