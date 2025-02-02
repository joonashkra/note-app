import mongoose from "mongoose";

export interface User {
  id: mongoose.Types.ObjectId;
  username: string;
  passwordHash: string;
  notes: mongoose.Types.ObjectId[];
  noteCollections: mongoose.Types.ObjectId[];
}

export interface NewUser {
  username: string;
  password: string;
}

export interface NonSensitiveUser {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  __v?: number;
  passwordHash?: string;
}

export interface AuthUser {
  username: string;
  id: mongoose.Types.ObjectId;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
