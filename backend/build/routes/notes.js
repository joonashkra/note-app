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
const express_1 = require("express");
const noteService_1 = __importDefault(require("../services/noteService"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const noteSchema_1 = require("../schemas/noteSchema");
const helpers_1 = require("../utils/helpers");
const router = (0, express_1.Router)();
router.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) return res.sendStatus(401);
    const notes = yield noteService_1.default.getEntries(req.user);
    res.send(notes);
    return;
  }),
);
router.get("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) return res.sendStatus(401);
    const note = yield noteService_1.default.getOne(req.params.id, req.user);
    res.send(note);
    return;
  }),
);
router.post(
  "/",
  middleware_1.default.parseBody(noteSchema_1.NewNoteSchema),
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!req.user) return res.sendStatus(401);
      const { noteCollection } = req.body;
      const data = Object.assign(Object.assign({}, req.body), {
        noteCollection:
          noteCollection === null
            ? null
            : (0, helpers_1.toObjectId)(noteCollection),
      });
      const newNote = yield noteService_1.default.addEntry(data, req.user);
      res.status(201).json(newNote);
      return;
    }),
);
router.delete("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) return res.sendStatus(401);
    yield noteService_1.default.deleteEntry(req.params.id, req.user);
    res.sendStatus(204);
    return;
  }),
);
router.put(
  "/:id",
  middleware_1.default.parseBody(noteSchema_1.NoteSchema),
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!req.user) return res.sendStatus(401);
      const { id, user, noteCollection } = req.body;
      const data = Object.assign(Object.assign({}, req.body), {
        id: (0, helpers_1.toObjectId)(id),
        user: (0, helpers_1.toObjectId)(user),
        noteCollection:
          noteCollection === null
            ? null
            : (0, helpers_1.toObjectId)(noteCollection),
      });
      const updatedNote = yield noteService_1.default.updateEntry(
        req.params.id,
        req.user,
        data,
      );
      res.send(updatedNote);
      return;
    }),
);
exports.default = router;
