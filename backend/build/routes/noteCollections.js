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
const middleware_1 = __importDefault(require("../utils/middleware"));
const noteCollectionService_1 = __importDefault(
  require("../services/noteCollectionService"),
);
const schemas_1 = require("../utils/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) return res.sendStatus(401);
    const noteCollections = yield noteCollectionService_1.default.getEntries(
      req.user,
    );
    res.send(noteCollections);
    return;
  }),
);
router.post("/", middleware_1.default.newNoteCollectionParser, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) return res.sendStatus(401);
    const newNoteCollection = yield noteCollectionService_1.default.addEntry(
      req.body,
      req.user,
    );
    res.status(201).json(newNoteCollection);
    return;
  }),
);
router.put("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) return res.sendStatus(401);
    const parsedNoteCollection = schemas_1.NoteCollectionSchema.safeParse(
      req.body,
    );
    if (!parsedNoteCollection.success) return res.sendStatus(400);
    const convertedNotes = parsedNoteCollection.data.notes.map(
      (note) => new mongoose_1.default.Types.ObjectId(note),
    );
    const convertedUsers = parsedNoteCollection.data.users.map(
      (user) => new mongoose_1.default.Types.ObjectId(user),
    );
    const collection = Object.assign(
      Object.assign({}, parsedNoteCollection.data),
      {
        id: new mongoose_1.default.Types.ObjectId(`${req.params.id}`),
        notes: convertedNotes,
        users: convertedUsers,
      },
    );
    const updatedNoteCollection =
      yield noteCollectionService_1.default.updateEntry(
        req.params.id,
        req.user,
        collection,
      );
    res.send(updatedNoteCollection);
    return;
  }),
);
exports.default = router;
