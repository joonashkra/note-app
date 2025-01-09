import UserModel from "../models/user";
import { NewUser } from "../types/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongooseError } from "mongoose";

const login = async (loginAttempt: NewUser) => {
  const { username, password } = loginAttempt;
  const user = await UserModel.findOne({ username });

  const validLogin =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && validLogin)) throw new MongooseError("LoginError");

  const userForToken = {
    username: user.username,
    id: user._id,
    notes: user.notes,
  };

  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("No secret.");
  }

  const token = jwt.sign(userForToken, secret, { expiresIn: "1d" });

  return {
    user: userForToken,
    token,
  };
};

export default {
  login,
};
