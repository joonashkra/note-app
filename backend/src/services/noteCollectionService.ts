import { MongooseError } from "mongoose";
import NoteCollectionModel from "../models/noteCollection";
import UserModel from "../models/user";
import { User } from "../types/users";
import { NewNoteCollection, NoteCollection } from "../types/noteCollections";
import NoteModel from "../models/note";

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
  return noteCollection;
};

const addEntry = async (
  collectionObject: NewNoteCollection,
  user: User,
): Promise<NoteCollection> => {
  const collectionUser = await UserModel.findById(user.id);

  if (!collectionUser) throw new MongooseError("User not found.");

  const newCollection = {
    ...collectionObject,
    users: [user.id],
  };

  const collection = new NoteCollectionModel(newCollection);
  const createdCollection = await collection.save();
  collectionUser.noteCollections = collectionUser.noteCollections.concat(
    createdCollection._id,
  );
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

  const updatedNoteCollection = await NoteCollectionModel.findByIdAndUpdate(
    id,
    collection,
    { new: true },
  );

  return updatedNoteCollection;
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
