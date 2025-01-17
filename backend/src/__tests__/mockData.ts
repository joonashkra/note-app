import { Note } from "../types/notes";
import bcrypt from "bcrypt";

export const mockNotes = [
  {
    title: "First Note",
    description: "This is the first test note",
    creationDate: new Date("2025-01-01"),
    deadlineDate: new Date("2025-01-10"),
    checked: false,
  },
  {
    title: "Second Note",
    description: "This is the second test note",
    creationDate: new Date("2025-01-05"),
    deadlineDate: new Date("2025-01-15"),
    checked: true,
  },
];

export const mockUser: {
  username: string;
  passwordHash: string;
  notes: Note[];
} = {
  username: "TestUser",
  passwordHash: bcrypt.hashSync("TestUser", 10),
  notes: [],
};
