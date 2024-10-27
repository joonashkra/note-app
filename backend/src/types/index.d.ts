
import { User } from '../types/users';
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
