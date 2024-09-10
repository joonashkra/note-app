import { Router, Request, Response, NextFunction } from 'express';
import { NewNoteSchema } from "../utils";
import { z } from "zod";
import { NewNote, Note } from '../types';
import NoteModel from '../models/note';

const router = Router();

router.get('/', (_req, res) => {
    NoteModel.find({})
        .then(notes => res.send(notes))
        .catch(err => {
            console.error(err);
            res.sendStatus(404);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    NoteModel.findById(id)
        .then(note => res.send(note))
        .catch(err => {
            console.error(err);
            res.sendStatus(404);
        });
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
    const noteObject = req.body;
    const creationDate = new Date();

    const newNote = {
        ...noteObject,
        creationDate: creationDate.toISOString(),
        checked: false
    };

    const note = new NoteModel(newNote);

    note.save()
        .then(savedNote => { 
            res.status(201).json(savedNote);
            console.log(savedNote);
        })
        .catch(err => {
            console.error('Error saving note:', err);
            res.sendStatus(500);
        });
});

router.use(errorMiddleware);

export default router;