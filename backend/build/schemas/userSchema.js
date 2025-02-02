"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
  username: zod_1.z.string(),
  password: zod_1.z.string().min(5),
});
exports.AuthResponseSchema = zod_1.z.object({
  user: zod_1.z.object({
    username: zod_1.z.string(),
    id: zod_1.z.string(),
  }),
  token: zod_1.z.string(),
});
