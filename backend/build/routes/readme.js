"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
  const path = "./README.md";
  fs_1.default.readFile(path, "utf-8", (error, data) => {
    if (error) {
      return res.status(500).send("Error reading README.md");
    }
    res.send(data);
    return;
  });
});
exports.default = router;
