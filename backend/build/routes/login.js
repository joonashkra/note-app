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
const loginService_1 = __importDefault(require("../services/loginService"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const userSchema_1 = require("../schemas/userSchema");
const router = (0, express_1.Router)();
router.post(
  "/",
  middleware_1.default.parseBody(userSchema_1.UserSchema),
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const auth = yield loginService_1.default.login(req.body);
      res.status(200).send(auth);
    }),
);
exports.default = router;
