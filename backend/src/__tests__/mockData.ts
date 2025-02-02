import { Note } from "../types/notes";
import bcrypt from "bcrypt";
import { NoteCollection } from "../types/noteCollections";

export const mockNotes = [
  {
    title: "First Note",
    description: "This is the first test note",
    creationDate: new Date("2025-01-01"),
    deadlineDate: new Date("2025-01-10"),
    checked: false,
    noteCollection: null,
  },
  {
    title: "Second Note",
    description: "This is the second test note",
    creationDate: new Date("2025-01-05"),
    deadlineDate: new Date("2025-01-15"),
    checked: true,
    noteCollection: null,
  },
  {
    title: "Third Note",
    description: "This is the third test note",
    creationDate: new Date("2025-01-06"),
    deadlineDate: new Date("2025-01-16"),
    checked: false,
    noteCollection: null,
  },
];

interface MockUser {
  username: string;
  passwordHash: string;
  notes: Note[];
  noteCollections: NoteCollection[];
}

export const mockUser: MockUser = {
  username: "TestUser",
  passwordHash: bcrypt.hashSync("TestUser", 10),
  notes: [],
  noteCollections: [],
};

export const mockUser2: MockUser = {
  username: "TestUser2",
  passwordHash: bcrypt.hashSync("TestUser2", 10),
  notes: [],
  noteCollections: [],
};
