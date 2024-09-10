import mongoose from 'mongoose';
import { Note } from "../types";

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

if(url) mongoose.connect(url)
    .then(_result => console.log('Connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error));

const noteSchema = new mongoose.Schema<Note>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: String, required: true },
    deadlineDate: { type: String, required: true },
    checked: { type: Boolean, required: true }
});

const NoteModel = mongoose.model<Note>('Note', noteSchema);

export default NoteModel;