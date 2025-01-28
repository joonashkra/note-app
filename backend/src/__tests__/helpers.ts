import { Response } from "supertest";
import { ZodSchema } from "zod";
import { Note } from "../types/notes";

export type NoteFromBackend = Omit<Note, "user" | "id"> & {
  user: { username: string; id: string };
  id: string;
};

const parseBody = <T>(res: Response, schema: ZodSchema<T>) => {
  const parsedBody = schema.safeParse(res.body);
  if (!parsedBody.success) throw new Error("res.body validation failed");
  const data = parsedBody.data;
  return data;
};

export default {
  parseBody,
};
