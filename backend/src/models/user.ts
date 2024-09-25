import mongoose from 'mongoose';
import { NonSensitiveUser, User } from "../types";

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    notes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Note' 
        }
    ]
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject: NonSensitiveUser) => {
      if(returnedObject._id) returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
    }
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;