import { Router } from "express";
import NoteModel from "../models/note";
import UserModel from "../models/user";
import NoteCollectionModel from "../models/noteCollection";

const router = Router();

router.post("/reset", async (_req, res) => {
  await NoteModel.deleteMany({});
  await UserModel.deleteMany({});
  await NoteCollectionModel.deleteMany({});

  res.status(204).end();
});

export default router;
