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
const noteCollection_1 = __importDefault(require("../models/noteCollection"));
const user_1 = __importDefault(require("../models/user"));
const getEntries = (user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user) return [];
    const collections = yield noteCollection_1.default.find({ users: user.id });
    return collections;
  });
const addEntry = (collectionObject, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const collectionUser = yield user_1.default.findById(user.id);
    if (!collectionUser) throw new mongoose_1.MongooseError("User not found.");
    const newCollection = Object.assign(Object.assign({}, collectionObject), {
      users: [collectionUser.id],
      notes: [],
    });
    const collection = new noteCollection_1.default(newCollection);
    const createdCollection = yield collection.save();
    collectionUser.noteCollections = collectionUser.noteCollections.concat(
      createdCollection._id,
    );
    yield collectionUser.save();
    return createdCollection;
  });
const updateEntry = (id, user, collection) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const noteCollectionToUpdate = yield noteCollection_1.default.findById(id);
    if (!noteCollectionToUpdate)
      throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (!noteCollectionToUpdate.users.includes(user.id))
      throw new mongoose_1.MongooseError("AuthError");
    const updatedNoteCollection =
      yield noteCollection_1.default.findByIdAndUpdate(id, collection, {
        new: true,
      });
    return updatedNoteCollection;
  });
exports.default = {
  getEntries,
  addEntry,
  updateEntry,
};
