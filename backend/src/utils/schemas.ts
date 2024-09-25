import { z } from "zod";

export const NewNoteSchema = z.object({
    title: z.string(),
    description: z.string(),
    deadlineDate: z.coerce.date(),
    user: z.string()
});

export const NewUserSchema = z.object({
    username: z.string(),
    password: z.string().min(5)
});