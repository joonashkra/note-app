import { Response } from "supertest";
import { ZodSchema } from "zod";
import { Note } from "../types/notes";
import { NoteCollection } from "../types/noteCollections";

// Backend sends ids as string not ObjectId
export type NoteFromBackend = Omit<Note, "user" | "id" | "noteCollection"> & {
  user: string;
  id: string;
  noteCollection: string | null;
};

export type NoteCollectionFromBackend = Omit<
  NoteCollection,
  "users" | "notes" | "id"
> & {
  users: string[];
  notes: string[];
  id: string;
};

export type PopulatedNote = Omit<Note, "user" | "id" | "noteCollection"> & {
  user: { username: string; id: string };
  id: string;
  noteCollection: { title: string; id: string } | null;
};

export type PopulatedNoteCollection = Omit<
  NoteCollection,
  "users" | "notes" | "id"
> & {
  users: { username: string; id: string }[];
  notes: { title: string; id: string }[];
  id: string;
};

const parseBody = <T>(res: Response, schema: ZodSchema<T>) => {
  const parsedBody = schema.safeParse(res.body);
  if (!parsedBody.success) {
    console.log(parsedBody.error);
    throw new Error("res.body validation failed");
  }
  const data = parsedBody.data;
  return data;
};

export default {
  parseBody,
};
