"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = exports.UserSchema = exports.NewNoteSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.NewNoteSchema = zod_1.z.object({
  title: zod_1.z.string(),
  description: zod_1.z.string(),
  deadlineDate: zod_1.z.coerce.date(),
});
exports.UserSchema = zod_1.z.object({
  username: zod_1.z.string(),
  password: zod_1.z.string().min(5),
});
exports.NoteSchema = zod_1.z.object({
  id: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
  title: zod_1.z.string(),
  description: zod_1.z.string(),
  creationDate: zod_1.z.coerce.date(),
  deadlineDate: zod_1.z.coerce.date(),
  user: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId),
  checked: zod_1.z.boolean(),
});
