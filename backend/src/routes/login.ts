
import { Router, Request, Response } from 'express';
import loginService from '../services/loginService';
import middleware from '../utils/middleware';
import { NewUser } from '../types/users';

const router = Router();

router.post('/', middleware.userParser, async (req: Request<unknown, unknown, NewUser>, res: Response) => {
    const token = await loginService.login(req.body);
    res.status(200).send({ token });
});

export default router;