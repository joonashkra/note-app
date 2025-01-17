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
  {
    title: "Third Note",
    description: "This is the third test note",
    creationDate: new Date("2025-01-06"),
    deadlineDate: new Date("2025-01-16"),
    checked: false,
  },
];

interface MockUser {
  username: string;
  passwordHash: string;
  notes: Note[];
}

export const mockUser: MockUser = {
  username: "TestUser",
  passwordHash: bcrypt.hashSync("TestUser", 10),
  notes: [],
};

export const mockUser2: MockUser = {
  username: "TestUser2",
  passwordHash: bcrypt.hashSync("TestUser2", 10),
  notes: [],
};
