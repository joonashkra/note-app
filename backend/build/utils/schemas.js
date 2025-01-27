"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseSchema = exports.NotesFromBackendSchema = exports.NoteFromBackendSchema = exports.NoteSchema = exports.UserSchema = exports.NewNoteSchema = void 0;
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
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    creationDate: zod_1.z.coerce.date(),
    deadlineDate: zod_1.z.coerce.date(),
    user: zod_1.z.string(),
    checked: zod_1.z.boolean(),
});
exports.NoteFromBackendSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    creationDate: zod_1.z.coerce.date(),
    deadlineDate: zod_1.z.coerce.date(),
    user: zod_1.z.object({ username: zod_1.z.string(), id: zod_1.z.string() }),
    checked: zod_1.z.boolean(),
});
exports.NotesFromBackendSchema = zod_1.z.array(exports.NoteFromBackendSchema);
exports.AuthResponseSchema = zod_1.z.object({
    user: zod_1.z.object({
        username: zod_1.z.string(),
        id: zod_1.z.string(),
        notes: zod_1.z.array(zod_1.z.string()),
    }),
    token: zod_1.z.string(),
});
