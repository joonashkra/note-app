
import { Router, Request, Response } from 'express';
import middleware from '../utils/middleware';
import { NewUser, User } from '../types/users';
import userService from '../services/userService';

const router = Router();

router.post('/', middleware.userParser, async (req: Request<unknown, unknown, NewUser>, res: Response<User>) => {
    const newUser = await userService.addEntry(req.body);
    res.status(201).json(newUser);
});

router.get('/', middleware.checkAuth, async (_req, res) => {
    const users = await userService.getEntries();
    res.send(users);
});

router.delete('/:id', middleware.checkAuth, async (req, res) => {
    await userService.deleteEntry(req.params.id);
    res.sendStatus(204);
});

export default router;