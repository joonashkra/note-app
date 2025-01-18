import mongoose from "mongoose";
import { z } from "zod";

export const NewNoteSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadlineDate: z.coerce.date(),
});

export const UserSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

export const NoteSchema = z.object({
  id: z.instanceof(mongoose.Types.ObjectId),
  title: z.string(),
  description: z.string(),
  creationDate: z.coerce.date(),
  deadlineDate: z.coerce.date(),
  user: z.instanceof(mongoose.Types.ObjectId),
  checked: z.boolean(),
});
