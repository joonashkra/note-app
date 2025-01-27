import { Router, Request, Response } from "express";
import loginService from "../services/loginService";
import middleware from "../utils/middleware";
import { NewUser } from "../types/users";

const router = Router();

router.post(
  "/",
  middleware.userParser,
  async (req: Request<unknown, unknown, NewUser>, res: Response) => {
    const auth = await loginService.login(req.body);
    res.status(200).send(auth);
  },
);

export default router;
