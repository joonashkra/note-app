import mongoose from "mongoose";
import { Note, PrettierNote } from "../types/notes";

const noteSchema = new mongoose.Schema<Note>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: String, required: true },
  deadlineDate: { type: String, required: true },
  checked: { type: Boolean, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

noteSchema.set("toJSON", {
  transform: (_document, returnedObject: PrettierNote) => {
    if (returnedObject._id) returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const NoteModel = mongoose.model<Note>("Note", noteSchema);

export default NoteModel;
