import { Router, Request, Response } from "express";
import { NewNote, Note } from "../types/notes";
import noteService from "../services/noteService";
import middleware from "../utils/middleware";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const notes = await noteService.getEntries(req.user.id);
  res.send(notes);
  return;
});

router.get("/:id", async (req, res) => {
  const note = await noteService.getOne(req.params.id);
  res.send(note);
});

router.post(
  "/",
  middleware.newNoteParser,
  async (req: Request<unknown, unknown, NewNote>, res: Response<Note>) => {
    if (!req.user) return res.sendStatus(401);
    const newNote = await noteService.addEntry(req.body, req.user.id);
    res.status(201).json(newNote);
    return;
  },
);

router.delete("/:id", async (req, res) => {
  await noteService.deleteEntry(req.params.id);
  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  const updatedNote = await noteService.checkEntry(req.params.id);
  res.send(updatedNote);
});

export default router;
