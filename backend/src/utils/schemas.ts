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
