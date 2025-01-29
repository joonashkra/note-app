import mongoose from "mongoose";

export interface Note {
  id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  creationDate: Date;
  deadlineDate: Date;
  checked: boolean;
  user: mongoose.Types.ObjectId;
  noteCollection: mongoose.Types.ObjectId | null;
}

export type NewNote = Omit<Note, "id" | "checked" | "creationDate">;

//For transformed mongoDb document without _id etc.
export interface PrettierNote {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  __v?: number;
}
