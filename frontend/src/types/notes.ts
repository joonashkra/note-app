import { Collection } from "./collections";
import { User } from "./users";

export interface Note {
  user: string;
  id: string;
  title: string;
  description: string;
  creationDate: string;
  deadlineDate: string;
  checked: boolean;
  noteCollection: string | null;
}

export type PopulatedNote = Omit<Note, "noteCollection" | "user"> & {
  noteCollection: Pick<Collection, "id" | "title">;
  user: Pick<User, "id" | "username">;
};

export type NewNote = Omit<Note, "id" | "checked" | "creationDate" | "user">;
