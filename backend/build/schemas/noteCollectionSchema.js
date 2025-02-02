"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulatedNoteCollectionSchema =
  exports.NoteCollectionSchema =
  exports.NewNoteCollectionSchema =
    void 0;
const zod_1 = require("zod");
exports.NewNoteCollectionSchema = zod_1.z.object({
  title: zod_1.z.string(),
  description: zod_1.z.string(),
  notes: zod_1.z.array(zod_1.z.string()),
});
exports.NoteCollectionSchema = zod_1.z.object({
  id: zod_1.z.string(),
  title: zod_1.z.string(),
  description: zod_1.z.string(),
  notes: zod_1.z.array(zod_1.z.string()),
  users: zod_1.z.array(zod_1.z.string()),
});
exports.PopulatedNoteCollectionSchema = zod_1.z.object({
  id: zod_1.z.string(),
  title: zod_1.z.string(),
  description: zod_1.z.string(),
  notes: zod_1.z.array(
    zod_1.z.object({
      title: zod_1.z.string(),
      id: zod_1.z.string(),
    }),
  ),
  users: zod_1.z.array(
    zod_1.z.object({
      username: zod_1.z.string(),
      id: zod_1.z.string(),
    }),
  ),
});
