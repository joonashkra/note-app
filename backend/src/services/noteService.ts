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

const getOne = async (id: string, userId: ObjectId): Promise<Note | null> => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  if (note.user.toString() !== userId.toString())
    throw new MongooseError("AuthError");
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
    user: user.id,
  };

  const note = new NoteModel(newNote);
  const createdNote = await note.save();
  user.notes = user.notes.concat(createdNote);
  await user.save();

  return createdNote;
};

const deleteEntry = async (id: string, userId: ObjectId) => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  if (note.user.toString() !== userId.toString())
    throw new MongooseError("AuthError");
  await NoteModel.findByIdAndDelete(id);
};

const updateEntry = async (
  id: string,
  userId: ObjectId,
  note: Note,
): Promise<Note | null> => {
  const noteToUpdate = await NoteModel.findById(id);
  if (!noteToUpdate) throw new MongooseError("DocumentNotFoundError");
  if (noteToUpdate.user.toString() !== userId.toString())
    throw new MongooseError("AuthError");
  const updatedNote = await NoteModel.findByIdAndUpdate(id, note, {
    new: true,
  });
  return updatedNote;
};

export default {
  getEntries,
  getOne,
  addEntry,
  deleteEntry,
  updateEntry,
};
