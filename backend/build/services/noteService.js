"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const noteCollection_1 = __importDefault(require("../models/noteCollection"));
const getEntries = (user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user) return [];
    const notes = yield note_1.default.find({ user: user.id });
    return notes;
  });
const getOne = (id, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_1.default.findById(id);
    if (!note) throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (user.id.toString() !== note.user.toString())
      throw new mongoose_1.MongooseError("AuthError");
    return note.populate([
      { path: "user", select: "username" },
      {
        path: "noteCollection",
        select: "title",
        match: { _id: { $ne: null } },
      },
    ]);
  });
const addEntry = (noteObject, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const creationDate = new Date();
    const noteUser = yield user_1.default.findById(user.id);
    if (!noteUser) throw new mongoose_1.MongooseError("User not found.");
    const newNote = Object.assign(Object.assign({}, noteObject), {
      creationDate,
      checked: false,
      user: user.id,
    });
    const note = new note_1.default(newNote);
    const createdNote = yield note.save();
    noteUser.notes.push(createdNote._id);
    yield noteUser.save();
    return createdNote;
  });
const deleteEntry = (id, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_1.default.findById(id);
    if (!note) throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (user.id.toString() !== note.user.toString())
      throw new mongoose_1.MongooseError("AuthError");
    if (note.noteCollection !== null) {
      yield noteCollection_1.default.updateOne(
        { _id: note.noteCollection },
        { $pull: { notes: id } },
      );
    }
    yield note_1.default.findByIdAndDelete(id);
  });
const updateEntry = (id, user, note) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const noteToUpdate = yield note_1.default.findById(id);
    if (!noteToUpdate)
      throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (user.id.toString() !== note.user.toString())
      throw new mongoose_1.MongooseError("AuthError");
    if (
      !((_a = noteToUpdate.noteCollection) === null || _a === void 0
        ? void 0
        : _a.equals(note.noteCollection))
    ) {
      if (note.noteCollection !== null) {
        const collection = yield noteCollection_1.default.findById(
          note.noteCollection,
        );
        if (!collection)
          throw new mongoose_1.MongooseError("DocumentNotFoundError");
        yield noteCollection_1.default.updateOne(
          { _id: note.noteCollection },
          { $addToSet: { notes: id } },
        );
      }
      yield noteCollection_1.default.updateOne(
        { _id: noteToUpdate.noteCollection },
        { $pull: { notes: note.id } },
      );
    }
    const updatedNote = yield note_1.default
      .findByIdAndUpdate(id, note, {
        new: true,
      })
      .populate([
        { path: "user", select: "username" },
        {
          path: "noteCollection",
          select: "title",
          match: { _id: { $ne: null } },
        },
      ]);
    return updatedNote;
  });
exports.default = {
  getEntries,
  getOne,
  addEntry,
  deleteEntry,
  updateEntry,
};
