import { test, expect } from "@playwright/test";
import { createCollection, login } from "./helpers";
import { NewCollection } from "../src/types/collections";

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
now.setDate(now.getDate() + 5);

const existingUser = {
  username: "existingUser",
  password: "existingUserPassword",
};

const newTestCollection: NewCollection = {
  title: "newTestNote",
  description: "This is a new note for testing",
  notes: [],
};

test.describe("collections", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: existingUser.username,
        password: existingUser.password,
      },
    });

    await login(page, existingUser.username, existingUser.password);
    await page.getByTestId("dashboardContent").waitFor();
  });

  test("create collection should work", async ({ page }) => {
    await page.getByTestId("createcollectionBtn").click();
    await createCollection(page, newTestCollection);

    await expect(page.getByTestId("collectionDetails")).toBeVisible();

    await expect(page.getByText(newTestCollection.title)).toBeVisible();
    await expect(page.getByText(newTestCollection.description)).toBeVisible();

    await page.getByText("Back to Dashboard").click();
    await expect(
      page
        .getByTestId("collectionListItem")
        .filter({ hasText: newTestCollection.title }),
    ).toBeVisible();
  });

  test("delete collection should work", async ({ page }) => {
    await page.evaluate(() => {
      window.confirm = () => true;
    });

    await page.getByTestId("createcollectionBtn").click();
    await createCollection(page, {
      ...newTestCollection,
      title: "collectionToDelete",
    });

    await expect(page.getByTestId("collectionDetails")).toBeVisible();

    await page.getByTestId("deleteCollectionBtn").click();

    await page.getByTestId("dashboardContent").waitFor();

    await expect(page.getByText("No collections yet")).toBeVisible();
  });

  test("update collection should work", async ({ page }) => {
    await page.getByTestId("createcollectionBtn").click();
    await createCollection(page, newTestCollection);

    await expect(page.getByTestId("collectionDetails")).toBeVisible();

    await page.getByTestId("toggleUpdateBtn").click();

    await page.getByPlaceholder("Title for collection...").fill("updatedTitle");
    await page
      .getByPlaceholder("Description and details for collection...")
      .fill("updated description");

    await page.getByTestId("updateCollectionBtn").click();

    await expect(page.getByTestId("collectionDetails")).toBeVisible();

    await expect(page.getByText("updatedTitle")).toBeVisible();
    await expect(page.getByText("updated description")).toBeVisible();
  });
});
