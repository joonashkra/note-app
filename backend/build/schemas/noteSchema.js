"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulatedNoteSchema = exports.NoteSchema = exports.NewNoteSchema = void 0;
const zod_1 = require("zod");
exports.NewNoteSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    deadlineDate: zod_1.z.coerce.date(),
    noteCollection: zod_1.z.string().nullable(),
});
exports.NoteSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    creationDate: zod_1.z.coerce.date(),
    deadlineDate: zod_1.z.coerce.date(),
    user: zod_1.z.string(),
    checked: zod_1.z.boolean(),
    noteCollection: zod_1.z.string().nullable(),
});
exports.PopulatedNoteSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    creationDate: zod_1.z.coerce.date(),
    deadlineDate: zod_1.z.coerce.date(),
    user: zod_1.z.object({ username: zod_1.z.string(), id: zod_1.z.string() }),
    checked: zod_1.z.boolean(),
    noteCollection: zod_1.z
        .object({
        title: zod_1.z.string(),
        id: zod_1.z.string(),
    })
        .nullable(),
});
