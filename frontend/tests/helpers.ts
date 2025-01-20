import { Page } from "@playwright/test";
import { NewNote } from "../src/types/notes";

const login = async (page: Page, username: string, password: string) => {
  await page.goto("/login");
  await page.getByPlaceholder("Type your username...").fill(username);
  await page.getByPlaceholder("Type your password...").fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
};

const createNote = async (page: Page, note: NewNote) => {
  await page.getByPlaceholder("Title for note...").fill(note.title);
  await page
    .getByPlaceholder("Description and details for note...")
    .fill(note.description);

  await page.getByTestId("datetimeInput").fill(note.deadlineDate);

  await page.getByRole("button", { name: "Create" }).click();
};

export { login, createNote };
