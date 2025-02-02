import { MongooseError } from "mongoose";
import NoteCollectionModel from "../models/noteCollection";
import UserModel from "../models/user";
import { User } from "../types/users";
import { NewNoteCollection, NoteCollection } from "../types/noteCollections";
import NoteModel from "../models/note";
import { notesMatch } from "../utils/helpers";

const getEntries = async (user: User): Promise<NoteCollection[]> => {
  if (!user) return [];
  const collections = await NoteCollectionModel.find({ users: user.id });
  return collections;
};

const getOne = async (
  id: string,
  user: User,
): Promise<NoteCollection | null> => {
  const noteCollection = await NoteCollectionModel.findById(id);
  if (!noteCollection) throw new MongooseError("DocumentNotFoundError");

  if (!noteCollection.users.includes(user.id))
    throw new MongooseError("AuthError");

  return noteCollection.populate([
    { path: "users", select: "username" },
    { path: "notes", select: "title", match: { _id: { $ne: null } } },
  ]);
};

const addEntry = async (
  collectionObject: NewNoteCollection,
  user: User,
): Promise<NoteCollection> => {
  const collectionUser = await UserModel.findById(user.id);
  if (!collectionUser) throw new MongooseError("User not found.");

  const newCollection = new NoteCollectionModel({
    ...collectionObject,
    users: [user.id],
  });

  const createdCollection = await newCollection.save();

  await NoteModel.find({ _id: { $in: collectionObject.notes } }).then(
    async (notes) => {
      const previousCollectionIds = notes
        .filter((note) => note.noteCollection)
        .map((note) => note.noteCollection);

      await NoteCollectionModel.updateMany(
        { _id: { $in: previousCollectionIds } },
        { $pull: { notes: { $in: collectionObject.notes } } },
      );
    },
  );

  await NoteModel.updateMany(
    { _id: { $in: collectionObject.notes } },
    { noteCollection: createdCollection._id },
  );

  collectionUser.noteCollections.push(createdCollection._id);
  await collectionUser.save();

  return createdCollection;
};

const updateEntry = async (
  id: string,
  user: User,
  collection: NoteCollection,
): Promise<NoteCollection | null> => {
  const noteCollectionToUpdate = await NoteCollectionModel.findById(id);

  if (!noteCollectionToUpdate) throw new MongooseError("DocumentNotFoundError");

  if (!noteCollectionToUpdate.users.includes(user.id))
    throw new MongooseError("AuthError");

  if (!notesMatch(collection.notes, noteCollectionToUpdate.notes)) {
    if (collection.notes.length < noteCollectionToUpdate.notes.length) {
      const removedNoteIds = noteCollectionToUpdate.notes.filter(
        (note) =>
          !collection.notes.some((collectionNote) =>
            collectionNote.equals(note),
          ),
      );

      await NoteModel.updateMany(
        { _id: { $in: removedNoteIds } },
        { noteCollection: null },
      );
    }

    if (collection.notes.length > noteCollectionToUpdate.notes.length) {
      const addedNoteIds = collection.notes.filter(
        (note) =>
          !noteCollectionToUpdate.notes.some((existingNote) =>
            existingNote.equals(note),
          ),
      );

      const existingNotesCount = await NoteModel.countDocuments({
        _id: { $in: addedNoteIds },
      });
      if (existingNotesCount !== addedNoteIds.length)
        throw new MongooseError("DocumentNotFoundError");

      await NoteModel.updateMany(
        { _id: { $in: addedNoteIds } },
        { noteCollection: collection.id },
      );
    }
  }

  const updatedNote = await NoteCollectionModel.findByIdAndUpdate(
    noteCollectionToUpdate._id,
    collection,
    { new: true },
  );
  if (!updatedNote) throw new MongooseError("DocumentNotFoundError");

  return updatedNote.populate([
    { path: "users", select: "username" },
    { path: "notes", select: "title", match: { _id: { $ne: null } } },
  ]);
};

const deleteEntry = async (id: string, user: User) => {
  const noteCollection = await NoteCollectionModel.findById(id);
  if (!noteCollection) throw new MongooseError("DocumentNotFoundError");
  if (!noteCollection.users.includes(user.id))
    throw new MongooseError("AuthError");
  await NoteModel.deleteMany({ _id: { $in: noteCollection.notes } });
  await NoteCollectionModel.findByIdAndDelete(id);
};

export default {
  getEntries,
  getOne,
  addEntry,
  updateEntry,
  deleteEntry,
};
