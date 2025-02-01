import { z } from "zod";

export const NewNoteCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  notes: z.array(z.string()),
});

export const NoteCollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  notes: z.array(z.string()),
  users: z.array(z.string()),
});

export const PopulatedNoteCollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  notes: z.array(
    z.object({
      title: z.string(),
      id: z.string(),
    }),
  ),
  users: z.array(
    z.object({
      username: z.string(),
      id: z.string(),
    }),
  ),
});
