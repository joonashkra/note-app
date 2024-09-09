import data from "../../data/notes";
import { uid } from 'uid';
import { Note, NewNote } from "../types";
const notes: Note[] = data;

const getAll = (): Note[] => {
    return notes;
};

const getOne = (id: string): Note | undefined => {
    const note = notes.find(note => note.id === id);
    return note;
};

const addNote = (noteObject: NewNote): Note => {

    const creationDate = new Date();

    const newNote = {
        id: uid(),
        ...noteObject,
        creationDate: creationDate.toISOString(),
        checked: false
    };

    notes.push(newNote);
    return newNote;
};

export default {
    getAll,
    getOne,
    addNote
};