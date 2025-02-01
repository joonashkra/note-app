import { Response, Router } from "express";
import { NoteCollection } from "../types/noteCollections";
import middleware from "../utils/middleware";
import noteCollectionService from "../services/noteCollectionService";
import {
  NewNoteCollectionSchema,
  NoteCollectionSchema,
} from "../schemas/noteCollectionSchema";
import { toObjectId, toObjectIdArray } from "../utils/helpers";

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
  middleware.parseBody(NewNoteCollectionSchema),
  async (req, res: Response<NoteCollection>) => {
    if (!req.user) return res.sendStatus(401);
    const data = { ...req.body, notes: toObjectIdArray(req.body.notes) };
    const newNoteCollection = await noteCollectionService.addEntry(
      data,
      req.user,
    );
    res.status(201).json(newNoteCollection);
    return;
  },
);

router.put(
  "/:id",
  middleware.parseBody(NoteCollectionSchema),
  async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const { id, notes, users } = req.body;

    const data = {
      ...req.body,
      notes: toObjectIdArray(notes),
      id: toObjectId(id),
      users: toObjectIdArray(users),
    };

    const updatedNoteCollection = await noteCollectionService.updateEntry(
      req.params.id,
      req.user,
      data,
    );

    res.send(updatedNoteCollection);
    return;
  },
);

router.delete("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  await noteCollectionService.deleteEntry(req.params.id, req.user);
  res.sendStatus(204);
  return;
});

export default router;
