import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

export const AuthResponseSchema = z.object({
  user: z.object({
    username: z.string(),
    id: z.string(),
  }),
  token: z.string(),
});
