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
  const { id, title, description, creationDate, deadlineDate, checked, user } =
    req.body;

  const note: Note = {
    id: mongoose.Types.ObjectId.createFromHexString(id),
    title,
    description,
    creationDate,
    deadlineDate,
    checked,
    user: mongoose.Types.ObjectId.createFromHexString(user),
  };

  const parsedNote = NoteSchema.safeParse(note);

  if (!parsedNote.success) return res.sendStatus(400);

  const updatedNote = await noteService.updateEntry(
    req.params.id,
    req.user,
    parsedNote.data,
  );
  res.send(updatedNote);
  return;
});

export default router;
