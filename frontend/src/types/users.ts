import { Collection } from "./collections";
import { Note } from "./notes";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  notes: string[];
  collections: string[];
}

export interface PopulatedUser {
  id: string;
  username: string;
  notes: Pick<Note, "id" | "title">[];
  collections: Pick<Collection, "id" | "title">[];
}

export interface NewUser {
  username: string;
  password: string;
}

export interface AuthUser {
  username: string;
  id: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
