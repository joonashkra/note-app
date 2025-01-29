import { Request } from "express";

import { Types } from "mongoose";

export const extractToken = (req: Request) => {
  const auth = req.get("authorization");

  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }

  return null;
};

export const notesMatch = (
  a: Types.ObjectId[],
  b: Types.ObjectId[],
): boolean => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
};
