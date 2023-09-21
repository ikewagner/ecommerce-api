"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_URL = exports.REFRESH_SECRET = exports.JWT_SECRET = exports.MONGODB_URL = exports.DEBUG_MODE = exports.APP_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.APP_PORT = _a.APP_PORT, exports.DEBUG_MODE = _a.DEBUG_MODE, exports.MONGODB_URL = _a.MONGODB_URL, exports.JWT_SECRET = _a.JWT_SECRET, exports.REFRESH_SECRET = _a.REFRESH_SECRET, exports.APP_URL = _a.APP_URL;
