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
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const noteCollection_1 = __importDefault(require("../models/noteCollection"));
const router = (0, express_1.Router)();
router.post("/reset", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield note_1.default.deleteMany({});
    yield user_1.default.deleteMany({});
    yield noteCollection_1.default.deleteMany({});
    res.status(204).end();
}));
exports.default = router;
