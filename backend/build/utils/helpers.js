"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = void 0;
const extractToken = (req) => {
    const auth = req.get("authorization");
    if (auth && auth.startsWith("Bearer ")) {
        return auth.replace("Bearer ", "");
    }
    return null;
};
exports.extractToken = extractToken;
