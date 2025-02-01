import { z } from "zod";

export const NewNoteSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadlineDate: z.coerce.date(),
  noteCollection: z.string().nullable(),
});

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  creationDate: z.coerce.date(),
  deadlineDate: z.coerce.date(),
  user: z.string(),
  checked: z.boolean(),
  noteCollection: z.string().nullable(),
});

export const PopulatedNoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  creationDate: z.coerce.date(),
  deadlineDate: z.coerce.date(),
  user: z.object({ username: z.string(), id: z.string() }),
  checked: z.boolean(),
  noteCollection: z
    .object({
      title: z.string(),
      id: z.string(),
    })
    .nullable(),
});
