"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteCollectionSchema = new mongoose_1.default.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  notes: [
    {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  users: [
    {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
noteCollectionSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if (returnedObject._id) returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const NoteCollectionModel = mongoose_1.default.model(
  "NoteCollection",
  noteCollectionSchema,
);
exports.default = NoteCollectionModel;
