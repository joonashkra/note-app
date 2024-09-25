import { Request, Response, NextFunction } from 'express';
import { NewNoteSchema, NewUserSchema } from "./schemas";
import { z } from "zod";
import { MongooseError } from 'mongoose';

const newNoteParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewNoteSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newUserParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewUserSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {

    if (error instanceof z.ZodError) return res.status(400).send({ error: error.issues });
    
    if(error instanceof MongooseError) {
        switch (error.message) {
            case 'DocumentNotFoundError': 
                return res.status(404).send({ error: 'Note not found.' });
            case 'CastError':
                return res.status(400).send({ error: 'Malformatted note id.' });
            case 'ValidationError':
                return res.status(400).send({ error: error.message });
            default:
                console.log(error);
                return res.status(400).json({ error: error.message });
        }
    }

    if (error instanceof Error && 'code' in error && error.code === 11000) {
        return res.status(400).send({ error: 'Expected username to be unique.' });
    }

    return res.status(500).json({ error: 'Something went wrong.' });
};

export default {
    newNoteParser,
    newUserParser,
    errorHandler
};