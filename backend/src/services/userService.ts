import { MongooseError } from "mongoose";
import UserModel from "../models/user";
import { NewUser, User } from "../types/users";
import bcrypt from "bcrypt";

const addEntry = async (userObject: NewUser): Promise<User> => {
  const passwordHash = await bcrypt.hash(userObject.password, 10);

  const newUser = {
    username: userObject.username,
    passwordHash,
    notes: [],
  };

  const user = new UserModel(newUser);
  const createdUser = await user.save();

  return createdUser;
};

const getEntries = async (): Promise<User[]> => {
  const users = await UserModel.find({});
  return users;
};

const getOne = async (id: string, reqUser: User): Promise<User | null> => {
  const user = await UserModel.findById(id);
  if (!user) throw new MongooseError("DocumentNotFoundError");
  if (reqUser.id.toString() !== user._id.toString())
    throw new MongooseError("AuthError");
  return user.populate([
    { path: "notes", select: "title" },
    { path: "noteCollections", select: "title", match: { _id: { $ne: null } } },
  ]);
};

const deleteEntry = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) throw new MongooseError("DocumentNotFoundError");
  await UserModel.findByIdAndDelete(id);
};

export default {
  addEntry,
  getEntries,
  getOne,
  deleteEntry,
};
