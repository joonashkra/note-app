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
const noteCollection_1 = __importDefault(require("../models/noteCollection"));
const user_1 = __importDefault(require("../models/user"));
const note_1 = __importDefault(require("../models/note"));
const helpers_1 = require("../utils/helpers");
const getEntries = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return [];
    const collections = yield noteCollection_1.default.find({ users: user.id });
    return collections;
});
const getOne = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const noteCollection = yield noteCollection_1.default.findById(id);
    if (!noteCollection)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (!noteCollection.users.includes(user.id))
        throw new mongoose_1.MongooseError("AuthError");
    return noteCollection.populate([
        { path: "users", select: "username" },
        { path: "notes", select: "title", match: { _id: { $ne: null } } },
    ]);
});
const addEntry = (collectionObject, user) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionUser = yield user_1.default.findById(user.id);
    if (!collectionUser)
        throw new mongoose_1.MongooseError("User not found.");
    const newCollection = new noteCollection_1.default(Object.assign(Object.assign({}, collectionObject), { users: [user.id] }));
    const createdCollection = yield newCollection.save();
    yield note_1.default.find({ _id: { $in: collectionObject.notes } }).then((notes) => __awaiter(void 0, void 0, void 0, function* () {
        const previousCollectionIds = notes
            .filter((note) => note.noteCollection)
            .map((note) => note.noteCollection);
        yield noteCollection_1.default.updateMany({ _id: { $in: previousCollectionIds } }, { $pull: { notes: { $in: collectionObject.notes } } });
    }));
    yield note_1.default.updateMany({ _id: { $in: collectionObject.notes } }, { noteCollection: createdCollection._id });
    collectionUser.noteCollections.push(createdCollection._id);
    yield collectionUser.save();
    return createdCollection;
});
const updateEntry = (id, user, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const noteCollectionToUpdate = yield noteCollection_1.default.findById(id);
    if (!noteCollectionToUpdate)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (!noteCollectionToUpdate.users.includes(user.id))
        throw new mongoose_1.MongooseError("AuthError");
    if (!(0, helpers_1.notesMatch)(collection.notes, noteCollectionToUpdate.notes)) {
        if (collection.notes.length < noteCollectionToUpdate.notes.length) {
            const removedNoteIds = noteCollectionToUpdate.notes.filter((note) => !collection.notes.some((collectionNote) => collectionNote.equals(note)));
            yield note_1.default.updateMany({ _id: { $in: removedNoteIds } }, { noteCollection: null });
        }
        if (collection.notes.length > noteCollectionToUpdate.notes.length) {
            const addedNoteIds = collection.notes.filter((note) => !noteCollectionToUpdate.notes.some((existingNote) => existingNote.equals(note)));
            const existingNotesCount = yield note_1.default.countDocuments({
                _id: { $in: addedNoteIds },
            });
            if (existingNotesCount !== addedNoteIds.length)
                throw new mongoose_1.MongooseError("DocumentNotFoundError");
            yield note_1.default.updateMany({ _id: { $in: addedNoteIds } }, { noteCollection: collection.id });
        }
    }
    const updatedNote = yield noteCollection_1.default.findByIdAndUpdate(noteCollectionToUpdate._id, collection, { new: true });
    if (!updatedNote)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    return updatedNote.populate([
        { path: "users", select: "username" },
        { path: "notes", select: "title", match: { _id: { $ne: null } } },
    ]);
});
const deleteEntry = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const noteCollection = yield noteCollection_1.default.findById(id);
    if (!noteCollection)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (!noteCollection.users.includes(user.id))
        throw new mongoose_1.MongooseError("AuthError");
    yield note_1.default.deleteMany({ _id: { $in: noteCollection.notes } });
    yield noteCollection_1.default.findByIdAndDelete(id);
});
exports.default = {
    getEntries,
    getOne,
    addEntry,
    updateEntry,
    deleteEntry,
};
