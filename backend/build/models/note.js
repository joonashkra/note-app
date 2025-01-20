"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: Date, required: true },
    deadlineDate: { type: Date, required: true },
    checked: { type: Boolean, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
noteSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        if (returnedObject._id)
            returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const NoteModel = mongoose_1.default.model("Note", noteSchema);
exports.default = NoteModel;
