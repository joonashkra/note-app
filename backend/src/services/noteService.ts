
import { MongooseError } from "mongoose";
import NoteModel from "../models/note";
import { NewNote, Note } from "../types";

const getEntries = async (): Promise<Note[]> => {
    const notes = await NoteModel.find({});
    return notes;
};

const getOne = async (id: string): Promise<Note | null> => {
    const note = await NoteModel.findById(id);
    if(!note) throw new MongooseError('DocumentNotFoundError');
    return note;
};

const addEntry = async (noteObject: NewNote): Promise<Note> => {
    const creationDate = new Date();
    const newNote = {
        ...noteObject,
        creationDate: creationDate.toISOString(),
        checked: false
    };

    const note = new NoteModel(newNote);
    const createdNote = await note.save();
    return createdNote;
};

const deleteEntry = async (id: string) => {
    const note = await NoteModel.findById(id);
    if(!note) throw new MongooseError('DocumentNotFoundError');
    await NoteModel.findByIdAndDelete(id);
};

const checkEntry = async (id: string): Promise<Note | null> => {
    const note = await NoteModel.findById(id);
    if(!note) throw new MongooseError('DocumentNotFoundError');
    const updatedNote = await NoteModel.findByIdAndUpdate(id, { checked: !note.checked }, { new: true });
    return updatedNote;
};

export default {
    getEntries,
    getOne,
    addEntry,
    deleteEntry,
    checkEntry
};