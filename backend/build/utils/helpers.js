"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObjectIdArray =
  exports.toObjectId =
  exports.notesMatch =
  exports.extractToken =
    void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const extractToken = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }
  return null;
};
exports.extractToken = extractToken;
const notesMatch = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort((x, y) => x.toString().localeCompare(y.toString()));
  b.sort((x, y) => x.toString().localeCompare(y.toString()));
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
};
exports.notesMatch = notesMatch;
const toObjectId = (id) => {
  return new mongoose_1.default.Types.ObjectId(`${id}`);
};
exports.toObjectId = toObjectId;
const toObjectIdArray = (ids) => {
  if (ids.length < 1) return [];
  return ids.map((id) => new mongoose_1.default.Types.ObjectId(`${id}`));
};
exports.toObjectIdArray = toObjectIdArray;
