import { Request } from "express";
import { User } from "./users";

export interface AuthenticatedRequest extends Request {
  user: User;
}
