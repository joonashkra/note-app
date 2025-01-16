import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadlineDate: z.coerce.date(),
});

export const newUserSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});
