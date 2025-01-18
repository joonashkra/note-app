import { MongooseError } from "mongoose";
import NoteModel from "../models/note";
import { NewNote, Note } from "../types/notes";
import UserModel from "../models/user";
import { User } from "../types/users";

const getEntries = async (user: User): Promise<Note[]> => {
  if (!user) return [];
  const notes = await NoteModel.find({ user: user.id }).populate("user", {
    username: 1,
  });
  return notes;
};

const getOne = async (id: string, user: User): Promise<Note | null> => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  if (note.user.toString() !== user.id.toString())
    throw new MongooseError("AuthError");
  return note;
};

const addEntry = async (noteObject: NewNote, user: User): Promise<Note> => {
  const creationDate = new Date();
  const noteUser = await UserModel.findById(user.id);

  if (!noteUser) throw new MongooseError("User not found.");

  const newNote = {
    ...noteObject,
    creationDate,
    checked: false,
    user: noteUser.id,
  };

  const note = new NoteModel(newNote);
  const createdNote = await note.save();
  user.notes = user.notes.concat(createdNote);
  await noteUser.save();

  return createdNote;
};

const deleteEntry = async (id: string, user: User) => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  if (note.user.toString() !== user.id.toString())
    throw new MongooseError("AuthError");
  await NoteModel.findByIdAndDelete(id);
};

const updateEntry = async (
  id: string,
  user: User,
  note: Note,
): Promise<Note | null> => {
  const noteToUpdate = await NoteModel.findById(id);
  if (!noteToUpdate) throw new MongooseError("DocumentNotFoundError");
  if (noteToUpdate.user.toString() !== user.id.toString())
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
