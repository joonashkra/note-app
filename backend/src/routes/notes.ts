import { Router, Request, Response } from 'express';
import { NewNote, Note } from '../types/notes';
import noteService from '../services/noteService';
import middleware from '../utils/middleware';

const router = Router();

router.get('/', async (_req, res) => {
    const notes = await noteService.getEntries();
    res.send(notes);
});

router.get('/:id', async (req, res) => {
    const note = await noteService.getOne(req.params.id);
    res.send(note);
});

router.post('/', middleware.newNoteParser, async (req: Request<unknown, unknown, NewNote>, res: Response<Note>) => {
    const newNote = await noteService.addEntry(req.body);
    res.status(201).json(newNote);
});

router.delete('/:id', async (req, res) => {
    await noteService.deleteEntry(req.params.id);
    res.sendStatus(204);
});

router.put('/:id', async (req, res) => {
    const updatedNote = await noteService.checkEntry(req.params.id);
    res.send(updatedNote);
});

export default router;