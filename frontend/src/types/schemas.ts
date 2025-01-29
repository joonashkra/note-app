import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadlineDate: z.coerce.date(),
  noteCollection: z.string().nullable(),
});

export const newUserSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

export const newCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  notes: z.array(z.string()),
});
