import mongoose from "mongoose";
import { Note } from "./notes";

export interface User {
  id: mongoose.Types.ObjectId;
  username: string;
  passwordHash: string;
  notes: Note[];
}

export interface NewUser {
  username: string;
  password: string;
}

//For transformed mongoDb document without passwordHash etc.
export interface NonSensitiveUser {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  __v?: number;
  passwordHash?: string;
}

export interface AuthUser {
  username: string;
  id: string;
  notes: Note[];
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
