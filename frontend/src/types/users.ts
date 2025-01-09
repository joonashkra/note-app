import { Note } from "./notes";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  notes: Note[];
}

export interface NewUser {
  username: string;
  password: string;
}

export type TokenUser = { username: string; token: string };

export interface TokenResponse {
  token: TokenUser;
}
