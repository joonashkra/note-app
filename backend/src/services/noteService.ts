import { MongooseError, ObjectId } from "mongoose";
import NoteModel from "../models/note";
import { NewNote, Note } from "../types/notes";
import UserModel from "../models/user";

const getEntries = async (userId: ObjectId): Promise<Note[]> => {
  if (!userId) return [];
  const notes = await NoteModel.find({ user: userId }).populate("user", {
    username: 1,
  });
  return notes;
};

const getOne = async (id: string): Promise<Note | null> => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  return note;
};

const addEntry = async (
  noteObject: NewNote,
  userId: ObjectId,
): Promise<Note> => {
  const creationDate = new Date();
  const user = await UserModel.findById(userId);

  if (!user) throw new MongooseError("User not found.");

  const newNote = {
    ...noteObject,
    creationDate,
    checked: false,
    user: userId,
  };

  const note = new NoteModel(newNote);
  const createdNote = await note.save();
  user.notes = user.notes.concat(createdNote);
  await user.save();

  return createdNote;
};

const deleteEntry = async (id: string) => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  await NoteModel.findByIdAndDelete(id);
};

const checkEntry = async (id: string): Promise<Note | null> => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  const updatedNote = await NoteModel.findByIdAndUpdate(
    id,
    { checked: !note.checked },
    { new: true },
  );
  return updatedNote;
};

export default {
  getEntries,
  getOne,
  addEntry,
  deleteEntry,
  checkEntry,
};
