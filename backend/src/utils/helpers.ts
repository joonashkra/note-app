import { Request } from "express";
import mongoose, { Types } from "mongoose";

export const extractToken = (req: Request) => {
  const auth = req.get("authorization");

  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }

  return null;
};

export const notesMatch = (
  a: mongoose.Types.ObjectId[],
  b: mongoose.Types.ObjectId[],
): boolean => {
  if (a.length !== b.length) return false;
  a.sort((x, y) => x.toString().localeCompare(y.toString()));
  b.sort((x, y) => x.toString().localeCompare(y.toString()));
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
};

export const toObjectId = (id: string): Types.ObjectId => {
  return new mongoose.Types.ObjectId(`${id}`);
};

export const toObjectIdArray = (ids: string[]): Types.ObjectId[] => {
  if (ids.length < 1) return [];
  return ids.map((id) => new mongoose.Types.ObjectId(`${id}`));
};
