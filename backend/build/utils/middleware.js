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
const schemas_1 = require("./schemas");
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("./helpers");
const user_1 = __importDefault(require("../models/user"));
const newNoteParser = (req, _res, next) => {
  try {
    schemas_1.NewNoteSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
const userParser = (req, _res, next) => {
  try {
    schemas_1.UserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
const errorHandler = (error, _req, res, _next) => {
  if (error instanceof zod_1.z.ZodError)
    return res.status(400).send({ error: error.issues });
  if (error instanceof mongoose_1.MongooseError) {
    switch (error.message) {
      case "DocumentNotFoundError":
        return res.status(404).send({ error: "Note not found." });
      case "CastError":
        return res.status(400).send({ error: "Malformatted note id." });
      case "ValidationError":
        return res.status(400).send({ error: error.message });
      case "AuthError":
        return res.status(401).send({ error: "Authorization failed." });
      default:
        return res.status(400).json({ error: error.message });
    }
  }
  if (error instanceof Error && "code" in error && error.code === 11000) {
    return res.status(400).send({ error: "Expected username to be unique." });
  }
  return res.status(500).json({ error });
};
const checkAuth = (req, _res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log("in checkAuth");
    console.log("req.path", req.path);
    if (req.path === "/api/readme" || req.path == "/api/tests/users") {
      return next(); // Skip authentication for the README route
    }
    console.log("still checking auth after ignore case");
    const auth = (0, helpers_1.extractToken)(req);
    if (!auth) throw new mongoose_1.MongooseError("AuthError");
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error("No secret.");
    }
    const decodedToken = jsonwebtoken_1.default.verify(auth, secret);
    if (!decodedToken.id) {
      throw new mongoose_1.MongooseError("AuthError");
    }
    const user = yield user_1.default.findById(decodedToken.id);
    if (!user) {
      throw new mongoose_1.MongooseError("AuthError");
    }
    req.user = user;
    next();
  });
exports.default = {
  newNoteParser,
  userParser,
  errorHandler,
  checkAuth,
};
