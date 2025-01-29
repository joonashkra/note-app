import { Collection } from "./collections";

export interface Note {
  user: string;
  id: string;
  title: string;
  description: string;
  creationDate: string;
  deadlineDate: string;
  checked: boolean;
  noteCollection: Pick<Collection, "id" | "title"> | null;
}

export type NewNote = Omit<Note, "id" | "checked" | "creationDate" | "user">;
