import { Router, Response } from "express";
import middleware from "../utils/middleware";
import { User } from "../types/users";
import userService from "../services/userService";
import { UserSchema } from "../schemas/userSchema";

const router = Router();

router.post(
  "/",
  middleware.parseBody(UserSchema),
  async (req, res: Response<User>) => {
    const newUser = await userService.addEntry(req.body);
    res.status(201).json(newUser);
  },
);

router.get("/", middleware.checkAuth, async (_req, res) => {
  const users = await userService.getEntries();
  res.send(users);
});

router.get("/:id", middleware.checkAuth, async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const user = await userService.getOne(req.params.id, req.user);
  res.send(user);
  return;
});

router.delete("/:id", middleware.checkAuth, async (req, res) => {
  await userService.deleteEntry(req.params.id);
  res.sendStatus(204);
});

export default router;
