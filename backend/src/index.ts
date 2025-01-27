import path from 'path'; // Ensure the path module is correctly imported
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import middleware from "./utils/middleware";
import express from "express";
import "express-async-errors";
import cors from "cors";
import noteRouter from "./routes/notes";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import readmeRouter from "./routes/readme";
import testingRouter from "./routes/testing";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
}

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

if (MONGODB_URI) {
  const safeURI = MONGODB_URI.match(/@([^/]+\/[^?]+)/);
  if (safeURI) console.log("connecting to", safeURI[1]);
  mongoose
    .connect(MONGODB_URI)
    .then((_result) => console.log("Connected to MongoDB"))
    .catch((error) => console.log("error connecting to MongoDB:", error));
}

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
  app.get('/api/health', (_req, res) => {
    res.status(200).send('OK');
  });
}


app.use("/api/readme", readmeRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.use("/api/notes", middleware.checkAuth);

app.use("/api/notes", noteRouter);

// Fallback to index.html for React routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
