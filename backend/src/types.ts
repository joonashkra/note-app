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

export interface User {
    id: mongoose.Schema.Types.ObjectId;
    username: string;
    passwordHash: string;
    notes: Note[];
}

//For transformed mongoDb document without passwordHash etc.
export interface NonSensitiveUser {
    _id?: mongoose.Types.ObjectId;
    id?: string;
    __v?: number;
    passwordHash?: string;
}

//For transformed mongoDb document without _id etc.
export interface PrettierNote {
    _id?: mongoose.Types.ObjectId;
    id?: string;
    __v?: number;
}

export type NewNote = Omit<Note, 'id'|'checked'|'creationDate'>;

export interface NewUser {
    username: string;
    password: string;
}