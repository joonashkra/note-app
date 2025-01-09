import { Note } from "./notes";
import { User } from "./users";

export interface Collection {
  title: string;
  notes: Note[];
  users: User[];
  creationDate: Date;
  deadlineDate: Date;
}
