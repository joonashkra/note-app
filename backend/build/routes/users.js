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
const userService_1 = __importDefault(require("../services/userService"));
const router = (0, express_1.Router)();
router.post("/", middleware_1.default.userParser, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userService_1.default.addEntry(req.body);
    res.status(201).json(newUser);
  }),
);
router.get("/", middleware_1.default.checkAuth, (_req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService_1.default.getEntries();
    res.send(users);
  }),
);
router.delete("/:id", middleware_1.default.checkAuth, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield userService_1.default.deleteEntry(req.params.id);
    res.sendStatus(204);
  }),
);
exports.default = router;
