import { MongooseError } from "mongoose";
import NoteModel from "../models/note";
import { NewNote, Note } from "../types/notes";
import UserModel from "../models/user";
import { User } from "../types/users";
import NoteCollectionModel from "../models/noteCollection";

const getEntries = async (user: User): Promise<Note[]> => {
  if (!user) return [];
  const notes = await NoteModel.find({ user: user.id });
  return notes;
};

const getOne = async (id: string, user: User): Promise<Note | null> => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  if (user.id.toString() !== note.user.toString())
    throw new MongooseError("AuthError");
  return note.populate([
    { path: "user", select: "username" },
    { path: "noteCollection", select: "title", match: { _id: { $ne: null } } },
  ]);
};

const addEntry = async (noteObject: NewNote, user: User): Promise<Note> => {
  const creationDate = new Date();
  const noteUser = await UserModel.findById(user.id);

  if (!noteUser) throw new MongooseError("User not found.");

  const newNote = {
    ...noteObject,
    creationDate,
    checked: false,
    user: user.id,
  };

  const note = new NoteModel(newNote);
  const createdNote = await note.save();
  user.notes = user.notes.concat(createdNote._id);
  await noteUser.save();

  return createdNote;
};

const deleteEntry = async (id: string, user: User) => {
  const note = await NoteModel.findById(id);
  if (!note) throw new MongooseError("DocumentNotFoundError");
  if (user.id.toString() !== note.user.toString())
    throw new MongooseError("AuthError");
  if (note.noteCollection !== null) {
    await NoteCollectionModel.updateOne(
      { _id: note.noteCollection },
      { $pull: { notes: id } },
    );
  }
  await NoteModel.findByIdAndDelete(id);
};

const updateEntry = async (
  id: string,
  user: User,
  note: Note,
): Promise<Note | null> => {
  const noteToUpdate = await NoteModel.findById(id);
  if (!noteToUpdate) throw new MongooseError("DocumentNotFoundError");

  if (user.id.toString() !== note.user.toString())
    throw new MongooseError("AuthError");

  if (!noteToUpdate.noteCollection?.equals(note.noteCollection)) {
    await NoteCollectionModel.updateOne(
      { _id: noteToUpdate.noteCollection },
      { $pull: { notes: note.id } },
    );
    await NoteCollectionModel.updateOne(
      { _id: note.noteCollection },
      { $addToSet: { notes: id } },
    );
  }

  const updatedNote = await NoteModel.findByIdAndUpdate(id, note, {
    new: true,
  }).populate([
    { path: "user", select: "username" },
    { path: "noteCollection", select: "title", match: { _id: { $ne: null } } },
  ]);
  return updatedNote;
};

export default {
  getEntries,
  getOne,
  addEntry,
  deleteEntry,
  updateEntry,
};
