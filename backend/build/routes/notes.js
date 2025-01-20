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
const express_1 = require("express");
const noteService_1 = __importDefault(require("../services/noteService"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const schemas_1 = require("../utils/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const notes = yield noteService_1.default.getEntries(req.user);
    res.send(notes);
    return;
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const note = yield noteService_1.default.getOne(req.params.id, req.user);
    res.send(note);
    return;
}));
router.post("/", middleware_1.default.newNoteParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const newNote = yield noteService_1.default.addEntry(req.body, req.user);
    res.status(201).json(newNote);
    return;
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    yield noteService_1.default.deleteEntry(req.params.id, req.user);
    res.sendStatus(204);
    return;
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const { id, title, description, creationDate, deadlineDate, checked, user } = req.body;
    const note = {
        id: mongoose_1.default.Types.ObjectId.createFromHexString(id),
        title,
        description,
        creationDate,
        deadlineDate,
        checked,
        user: mongoose_1.default.Types.ObjectId.createFromHexString(user),
    };
    const parsedNote = schemas_1.NoteSchema.safeParse(note);
    if (!parsedNote.success)
        return res.sendStatus(400);
    const updatedNote = yield noteService_1.default.updateEntry(req.params.id, req.user, parsedNote.data);
    res.send(updatedNote);
    return;
}));
exports.default = router;
