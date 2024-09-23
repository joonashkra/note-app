import mongoose from "mongoose";

export interface Note {
    id: string;
    title: string;
    description: string;
    creationDate: string; 
    deadlineDate: string; 
    checked: boolean;
}

export interface User {
    id: string;
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

export type NewNote = Omit<Note, 'id'|'checked'|'creationDate'>;

export interface NewUser {
    username: string;
    password: string;
}