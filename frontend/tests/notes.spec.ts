import { test, expect } from "@playwright/test";
import { formatDate } from "../src/utils";
import { NewNote } from "../src/types/notes";
import { createNote, login } from "./helpers";

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
now.setDate(now.getDate() + 5);
const deadlineDate = now.toISOString().slice(0, 16);

const existingUser = {
  username: "existingUser",
  password: "existingUserPassword",
};

const newTestNote: NewNote = {
  title: "newTestNote",
  description: "This is a new note for testing",
  deadlineDate,
  noteCollection: null,
};

test.describe("notes", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: existingUser.username,
        password: existingUser.password,
      },
    });

    await login(page, existingUser.username, existingUser.password);
  });

  test("create note should work", async ({ page }) => {
    await page.getByTestId("createNoteBtn").click();
    await createNote(page, newTestNote);

    await expect(page.getByTestId("noteDetailsPage")).toBeVisible();

    await expect(page.getByText(newTestNote.title)).toBeVisible();
    await expect(page.getByText(newTestNote.description)).toBeVisible();
    await expect(
      page.getByText(formatDate(newTestNote.deadlineDate)),
    ).toBeVisible();

    await page.getByText("Back to Dashboard").click();
    await expect(
      page.getByTestId("notesListItem").filter({ hasText: newTestNote.title }),
    ).toBeVisible();
  });

  test("check note should work", async ({ page }) => {
    page.on("console", (msg) => console.log(msg.text()));
    await page.getByTestId("createNoteBtn").click();
    await createNote(page, newTestNote);
    await page.getByTestId("checkNoteBtn").waitFor();
    await page.getByTestId("checkNoteBtn").click();
    await expect(page.getByText("Uncheck done")).toBeVisible();
  });

  test("delete note should work", async ({ page }) => {
    await page.getByTestId("createNoteBtn").click();
    await createNote(page, { ...newTestNote, title: "noteToDelete" });

    await expect(page.getByTestId("noteDetailsPage")).toBeVisible();

    await page.getByTestId("deleteNoteBtn").click();

    await page.getByTestId("dashboardContent").waitFor();

    await expect(page.getByText("No notes yet")).toBeVisible();
  });

  test("update note should work", async ({ page }) => {
    await page.getByTestId("createNoteBtn").click();
    await createNote(page, newTestNote);

    await expect(page.getByTestId("noteDetailsPage")).toBeVisible();

    await page.getByTestId("toggleUpdateBtn").click();

    await page.getByPlaceholder("Title for note...").fill("updatedTitle");
    await page
      .getByPlaceholder("Description and details for note...")
      .fill("updated description");

    await page.getByTestId("updateNoteBtn").click();

    await expect(page.getByTestId("noteDetailsPage")).toBeVisible();

    await expect(page.getByText("updatedTitle")).toBeVisible();
    await expect(page.getByText("updated description")).toBeVisible();
  });
});
