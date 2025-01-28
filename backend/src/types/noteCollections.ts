import mongoose from "mongoose";

export interface NoteCollection {
  id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  notes: mongoose.Types.ObjectId[];
  users: mongoose.Types.ObjectId[];
}

export type NewNoteCollection = Omit<NoteCollection, "id" | "notes" | "users">;

export interface PrettierNoteCollection {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  __v?: number;
}
