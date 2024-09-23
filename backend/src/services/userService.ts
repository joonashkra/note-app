import UserModel from "../models/user";
import { NewUser, User } from "../types";
import bcrypt from 'bcrypt';

const addEntry = async (userObject: NewUser): Promise<User> => {
    const passwordHash = await bcrypt.hash(userObject.password, 10);

    const newUser = {
        username: userObject.username,
        passwordHash,
        notes: []
    };

    const user = new UserModel(newUser);
    const createdUser = await user.save();

    return createdUser;
};

export default {
    addEntry,
};