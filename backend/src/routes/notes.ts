import { Router, Request, Response, NextFunction } from 'express';
import noteService from "../services/noteService";
import { NewNoteSchema } from "../utils";
import { z } from "zod";
import { NewNote, Note } from '../types';

const router = Router();

router.get('/', (_req, res) => {
    const notes = noteService.getAll();
    res.send(notes);
});

router.get('/:id', (req, res) => {
    const note = noteService.getOne(req.params.id);
    if(note) res.send(note);
    else res.sendStatus(404);
});

const newNoteParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewNoteSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
};

router.post('/', newNoteParser, (req: Request<unknown, unknown, NewNote>, res: Response<Note>) => {
    const newNote = noteService.addNote(req.body);
    res.json(newNote);
});

router.use(errorMiddleware);

export default router;