import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";
import { MongooseError } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { extractToken } from "./helpers";
import UserModel from "../models/user";

const parseBody = <T>(schema: ZodSchema<T>) => {
  return (
    req: Request<{ id: string }, unknown, T>,
    _res: Response,
    next: NextFunction,
  ) => {
    const parsedBody = schema.safeParse(req.body);
    if (!parsedBody.success) {
      return next(parsedBody.error);
    }
    req.body = parsedBody.data;
    next();
  };
};

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof z.ZodError)
    return res.status(400).send({ error: error.issues });

  if (error instanceof MongooseError) {
    switch (error.message) {
      case "DocumentNotFoundError":
        return res.status(404).send({ error: "Document not found." });
      case "CastError":
        return res.status(400).send({ error: "Malformatted document id." });
      case "ValidationError":
        return res.status(400).send({ error: error.message });
      case "AuthError":
        return res.status(401).send({ error: "Authorization failed." });
      default:
        return res.status(400).json({ error: error.message });
    }
  }

  if (error instanceof Error && "code" in error && error.code === 11000) {
    return res.status(400).send({ error: "Expected username to be unique." });
  }

  return res.status(500).json({ error });
};

const checkAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const auth = extractToken(req);

  if (!auth) throw new MongooseError("AuthError");

  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error("No secret.");
  }

  const decodedToken = jwt.verify(auth, secret) as JwtPayload;

  if (!decodedToken.id) {
    throw new MongooseError("AuthError");
  }

  const user = await UserModel.findById(decodedToken.id);
  if (!user) {
    throw new MongooseError("AuthError");
  }

  req.user = user;

  next();
};

export default {
  errorHandler,
  checkAuth,
  parseBody,
};
