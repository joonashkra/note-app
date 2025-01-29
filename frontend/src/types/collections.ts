import { Note } from "./notes";
import { User } from "./users";

export interface Collection {
  id: string;
  title: string;
  description: string;
  notes: Pick<Note, "id" | "title">[];
  users: Pick<User, "id" | "username">[];
}

export type NewCollection = Omit<Collection, "id" | "users">;
