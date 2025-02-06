import { test, expect } from "@playwright/test";

test.describe("auth", () => {
  test.beforeEach(async ({ request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: { username: "existingUser", password: "existingUserPassword" },
    });
  });

  test("sign up should work", async ({ page }) => {
    await page.goto("http://localhost:5173/signup");
    await page.getByPlaceholder("Type new username...").fill("newUserUsername");
    await page.getByPlaceholder("Type new password...").fill("newUserPassword");

    await page.getByRole("button", { name: "Sign Up" }).click();

    // redirect after succesful login
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
  });

  test("signup should show error message when user already exists", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/signup");
    await page.getByPlaceholder("Type new username...").fill("existingUser");
    await page
      .getByPlaceholder("Type new password...")
      .fill("existingUserPassword");

    await page.getByRole("button", { name: "Sign Up" }).click();

    // error message when the user already exists
    await expect(
      page.getByText("This account might already exist"),
    ).toBeVisible();
  });

  test("log in should work with valid credentials and redirect to dashboard", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/login");
    await page.getByPlaceholder("Type your username...").fill("existingUser");
    await page
      .getByPlaceholder("Type your password...")
      .fill("existingUserPassword");

    await page.getByRole("button", { name: "Log In" }).click();

    // redirect to dashboard after successful login
    await expect(page.getByTestId("dashboardContent")).toBeVisible();
  });

  test("login should show error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/login");
    await page.getByPlaceholder("Type your username...").fill("existingUser");
    await page.getByPlaceholder("Type your password...").fill("wrongPassword");

    await page.getByRole("button", { name: "Log In" }).click();

    // error message with invalid credentials
    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });
});
