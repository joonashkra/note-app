import { Collection } from "./collections";
import { Note } from "./notes";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  notes: Note[];
  collections: Collection[];
}

export interface NewUser {
  username: string;
  password: string;
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
