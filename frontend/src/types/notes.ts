export interface Note {
  user: string;
  id: string;
  title: string;
  description: string;
  creationDate: string;
  deadlineDate: string;
  checked: boolean;
}

export type NewNote = Omit<Note, "id" | "checked" | "creationDate" | "user">;
