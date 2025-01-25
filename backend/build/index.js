"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const notes_1 = __importDefault(require("./routes/notes"));
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const readme_1 = __importDefault(require("./routes/readme"));
const testing_1 = __importDefault(require("./routes/testing"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.set("strictQuery", false);
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
if (MONGODB_URI) {
  const safeURI = MONGODB_URI.match(/@([^/]+\/[^?]+)/);
  if (safeURI) console.log("connecting to", safeURI[1]);
  mongoose_1.default
    .connect(MONGODB_URI)
    .then((_result) => console.log("Connected to MongoDB"))
    .catch((error) => console.log("error connecting to MongoDB:", error));
}
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testing_1.default);
}
app.use("/api/readme", readme_1.default);
app.use("/api/login", login_1.default);
app.use("/api/users", users_1.default);
app.use(middleware_1.default.checkAuth);
app.use("/api/notes", notes_1.default);
app.use(middleware_1.default.errorHandler);
const PORT = process.env.PORT || 3001;
exports.server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
exports.default = app;
