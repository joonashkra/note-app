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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addEntry = (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = yield bcrypt_1.default.hash(userObject.password, 10);
    const newUser = {
        username: userObject.username,
        passwordHash,
        notes: [],
    };
    const user = new user_1.default(newUser);
    const createdUser = yield user.save();
    return createdUser;
});
const getEntries = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    return users;
});
const getOne = (id, reqUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    if (reqUser.id.toString() !== user._id.toString())
        throw new mongoose_1.MongooseError("AuthError");
    return user.populate([
        { path: "notes", select: "title" },
        { path: "noteCollections", select: "title", match: { _id: { $ne: null } } },
    ]);
});
const deleteEntry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user)
        throw new mongoose_1.MongooseError("DocumentNotFoundError");
    yield user_1.default.findByIdAndDelete(id);
});
exports.default = {
    addEntry,
    getEntries,
    getOne,
    deleteEntry,
};
