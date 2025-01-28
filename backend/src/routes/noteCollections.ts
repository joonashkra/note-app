import { Request, Response, Router } from "express";
import { NewNoteCollection, NoteCollection } from "../types/noteCollections";
import middleware from "../utils/middleware";
import noteCollectionService from "../services/noteCollectionService";
import { NoteCollectionSchema } from "../utils/schemas";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const noteCollections = await noteCollectionService.getEntries(req.user);
  res.send(noteCollections);
  return;
});

router.get("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const noteCollection = await noteCollectionService.getOne(
    req.params.id,
    req.user,
  );
  res.send(noteCollection);
  return;
});

router.post(
  "/",
  middleware.newNoteCollectionParser,
  async (
    req: Request<unknown, unknown, NewNoteCollection>,
    res: Response<NoteCollection>,
  ) => {
    if (!req.user) return res.sendStatus(401);
    const newNoteCollection = await noteCollectionService.addEntry(
      req.body,
      req.user,
    );
    res.status(201).json(newNoteCollection);
    return;
  },
);

router.put("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const parsedNoteCollection = NoteCollectionSchema.safeParse(req.body);
  if (!parsedNoteCollection.success) return res.sendStatus(400);

  const convertedNotes = parsedNoteCollection.data.notes.map(
    (note: string) => new mongoose.Types.ObjectId(note),
  );
  const convertedUsers = parsedNoteCollection.data.users.map(
    (user: string) => new mongoose.Types.ObjectId(user),
  );

  const collection = {
    ...parsedNoteCollection.data,
    id: new mongoose.Types.ObjectId(`${req.params.id}`),
    notes: convertedNotes,
    users: convertedUsers,
  };

  const updatedNoteCollection = await noteCollectionService.updateEntry(
    req.params.id,
    req.user,
    collection,
  );

  res.send(updatedNoteCollection);
  return;
});

router.delete("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  await noteCollectionService.deleteEntry(req.params.id, req.user);
  res.sendStatus(204);
  return;
});

export default router;
