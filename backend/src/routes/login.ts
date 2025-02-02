import { Router, Response } from "express";
import loginService from "../services/loginService";
import middleware from "../utils/middleware";
import { UserSchema } from "../schemas/userSchema";

const router = Router();

router.post(
  "/",
  middleware.parseBody(UserSchema),
  async (req, res: Response) => {
    const auth = await loginService.login(req.body);
    res.status(200).send(auth);
  },
);

export default router;
