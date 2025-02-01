import { Router, Response } from "express";
import { Note } from "../types/notes";
import noteService from "../services/noteService";
import middleware from "../utils/middleware";
import { NewNoteSchema, NoteSchema } from "../schemas/noteSchema";
import { toObjectId } from "../utils/helpers";

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
  middleware.parseBody(NewNoteSchema),
  async (req, res: Response<Note>) => {
    if (!req.user) return res.sendStatus(401);
    const { noteCollection } = req.body;
    const data = {
      ...req.body,
      noteCollection:
        noteCollection === null ? null : toObjectId(noteCollection),
    };
    const newNote = await noteService.addEntry(data, req.user);
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

router.put("/:id", middleware.parseBody(NoteSchema), async (req, res) => {
  if (!req.user) return res.sendStatus(401);

  const { id, user, noteCollection } = req.body;

  const data = {
    ...req.body,
    id: toObjectId(id),
    user: toObjectId(user),
    noteCollection: noteCollection === null ? null : toObjectId(noteCollection),
  };

  const updatedNote = await noteService.updateEntry(
    req.params.id,
    req.user,
    data,
  );
  res.send(updatedNote);
  return;
});

export default router;
