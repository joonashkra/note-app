import { Router, Request, Response } from "express";
import { NewNote, Note } from "../types/notes";
import noteService from "../services/noteService";
import middleware from "../utils/middleware";
import { NoteSchema } from "../utils/schemas";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const notes = await noteService.getEntries(req.user);
  res.send(notes);
  return;
});

router.get("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const note = await noteService.getOne(req.params.id, req.user);
  res.send(note);
  return;
});

router.post(
  "/",
  middleware.newNoteParser,
  async (req: Request<unknown, unknown, NewNote>, res: Response<Note>) => {
    if (!req.user) return res.sendStatus(401);
    const newNote = await noteService.addEntry(req.body, req.user);
    res.status(201).json(newNote);
    return;
  },
);

router.delete("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  await noteService.deleteEntry(req.params.id, req.user);
  res.sendStatus(204);
  return;
});

router.put("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);

  const parsedNote = NoteSchema.safeParse(req.body);

  if (!parsedNote.success) return res.sendStatus(400);

  const { id, title, description, creationDate, deadlineDate, checked, user } =
    parsedNote.data;

  const note: Note = {
    id: new mongoose.Types.ObjectId(`${id}`),
    title: title,
    description,
    creationDate,
    deadlineDate,
    checked,
    user: new mongoose.Types.ObjectId(`${user}`),
  };

  const updatedNote = await noteService.updateEntry(
    req.params.id,
    req.user,
    note,
  );
  res.send(updatedNote);
  return;
});

export default router;
