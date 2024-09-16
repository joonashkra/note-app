import mongoose from 'mongoose';
import { Note } from "../types";

const noteSchema = new mongoose.Schema<Note>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: String, required: true },
    deadlineDate: { type: String, required: true },
    checked: { type: Boolean, required: true }
});

const NoteModel = mongoose.model<Note>('Note', noteSchema);

export default NoteModel;