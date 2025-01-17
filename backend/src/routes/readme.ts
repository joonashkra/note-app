import { Router } from "express";
import fs from "fs";

const router = Router();

router.get("/", async (_req, res) => {
  const path = "../README.md";
  fs.readFile(path, "utf-8", (error, data) => {
    if (error) {
      return res.status(500).send("Error reading README.md");
    }
    res.send(data);
    return;
  });
});

export default router;
