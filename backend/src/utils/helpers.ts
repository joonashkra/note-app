import { Request } from "express";

export const extractToken = (req: Request) => {
  const auth = req.get("authorization");

  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }

  return null;
};
