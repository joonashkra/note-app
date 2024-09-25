
import { Router, Request, Response } from 'express';
import middleware from '../utils/middleware';
import { NewUser, User } from '../types';
import userService from '../services/userService';

const router = Router();

router.post('/', middleware.newUserParser, async (req: Request<unknown, unknown, NewUser>, res: Response<User>) => {
    const newUser = await userService.addEntry(req.body);
    res.status(201).json(newUser);
});

router.get('/', async (_req, res) => {
    const users = await userService.getEntries();
    res.send(users);
});

export default router;