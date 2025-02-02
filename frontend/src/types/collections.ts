import { Note } from "./notes";
import { User } from "./users";

export interface Collection {
  id: string;
  title: string;
  description: string;
  notes: string[];
  users: string[];
}

export type PopulatedCollection = Omit<Collection, "notes" | "users"> & {
  notes: Pick<Note, "id" | "title">[];
  users: Pick<User, "id" | "username">[];
};

export type NewCollection = Omit<Collection, "id" | "users">;
