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
const middleware_1 = __importDefault(require("../utils/middleware"));
const noteCollectionService_1 = __importDefault(require("../services/noteCollectionService"));
const noteCollectionSchema_1 = require("../schemas/noteCollectionSchema");
const helpers_1 = require("../utils/helpers");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const noteCollections = yield noteCollectionService_1.default.getEntries(req.user);
    res.send(noteCollections);
    return;
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const noteCollection = yield noteCollectionService_1.default.getOne(req.params.id, req.user);
    res.send(noteCollection);
    return;
}));
router.post("/", middleware_1.default.parseBody(noteCollectionSchema_1.NewNoteCollectionSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const data = Object.assign(Object.assign({}, req.body), { notes: (0, helpers_1.toObjectIdArray)(req.body.notes) });
    const newNoteCollection = yield noteCollectionService_1.default.addEntry(data, req.user);
    res.status(201).json(newNoteCollection);
    return;
}));
router.put("/:id", middleware_1.default.parseBody(noteCollectionSchema_1.NoteCollectionSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    const { id, notes, users } = req.body;
    const data = Object.assign(Object.assign({}, req.body), { notes: (0, helpers_1.toObjectIdArray)(notes), id: (0, helpers_1.toObjectId)(id), users: (0, helpers_1.toObjectIdArray)(users) });
    const updatedNoteCollection = yield noteCollectionService_1.default.updateEntry(req.params.id, req.user, data);
    res.send(updatedNoteCollection);
    return;
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(401);
    yield noteCollectionService_1.default.deleteEntry(req.params.id, req.user);
    res.sendStatus(204);
    return;
}));
exports.default = router;
