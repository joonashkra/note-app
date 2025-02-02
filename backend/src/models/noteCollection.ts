import mongoose from "mongoose";
import {
  PrettierNoteCollection,
  NoteCollection,
} from "../types/noteCollections";

const noteCollectionSchema = new mongoose.Schema<NoteCollection>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

noteCollectionSchema.set("toJSON", {
  transform: (_document, returnedObject: PrettierNoteCollection) => {
    if (returnedObject._id) returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const NoteCollectionModel = mongoose.model<NoteCollection>(
  "NoteCollection",
  noteCollectionSchema,
);

export default NoteCollectionModel;
