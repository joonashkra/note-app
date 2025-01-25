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
  id: z.string(),
  title: z.string(),
  description: z.string(),
  creationDate: z.coerce.date(),
  deadlineDate: z.coerce.date(),
  user: z.string(),
  checked: z.boolean(),
});

export const NoteFromBackendSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  creationDate: z.coerce.date(),
  deadlineDate: z.coerce.date(),
  user: z.object({ username: z.string(), id: z.string() }),
  checked: z.boolean(),
});

export const NotesFromBackendSchema = z.array(NoteFromBackendSchema);

export const AuthResponseSchema = z.object({
  user: z.object({
    username: z.string(),
    id: z.string(),
    notes: z.array(z.string()),
  }),
  token: z.string(),
});
