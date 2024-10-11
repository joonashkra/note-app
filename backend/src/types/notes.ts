import mongoose from "mongoose";

export interface Note {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    creationDate: string; 
    deadlineDate: string; 
    checked: boolean;
    user: mongoose.Schema.Types.ObjectId;
}

export type NewNote = Omit<Note, 'id'|'checked'|'creationDate'>;

//For transformed mongoDb document without _id etc.
export interface PrettierNote {
    _id?: mongoose.Types.ObjectId;
    id?: string;
    __v?: number;
}