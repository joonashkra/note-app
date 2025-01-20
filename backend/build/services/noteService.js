"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const getEntries = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return [];
    const notes = yield note_1.default.find({ user: user.id }).populate("user", {
        username: 1,
    });
    return notes;
});
const getOne = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_1.default.findById(id);
    if (!note)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (note.user.toString() !== user.id.toString())
        throw new mongoose_1.MongooseError("AuthError");
    return note;
});
const addEntry = (noteObject, user) => __awaiter(void 0, void 0, void 0, function* () {
    const creationDate = new Date();
    const noteUser = yield user_1.default.findById(user.id);
    if (!noteUser)
        throw new mongoose_1.MongooseError("User not found.");
    const newNote = Object.assign(Object.assign({}, noteObject), { creationDate, checked: false, user: noteUser.id });
    const note = new note_1.default(newNote);
    const createdNote = yield note.save();
    user.notes = user.notes.concat(createdNote);
    yield noteUser.save();
    return createdNote;
});
const deleteEntry = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_1.default.findById(id);
    if (!note)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (note.user.toString() !== user.id.toString())
        throw new mongoose_1.MongooseError("AuthError");
    yield note_1.default.findByIdAndDelete(id);
});
const updateEntry = (id, user, note) => __awaiter(void 0, void 0, void 0, function* () {
    const noteToUpdate = yield note_1.default.findById(id);
    if (!noteToUpdate)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (noteToUpdate.user.toString() !== user.id.toString())
        throw new mongoose_1.MongooseError("AuthError");
    const updatedNote = yield note_1.default.findByIdAndUpdate(id, note, {
        new: true,
    });
    return updatedNote;
});
exports.default = {
    getEntries,
    getOne,
    addEntry,
    deleteEntry,
    updateEntry,
};
