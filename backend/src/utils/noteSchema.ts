import { z } from "zod";

export const NewNoteSchema = z.object({
    title: z.string(),
    description: z.string(),
    deadlineDate: z.coerce.date()
});