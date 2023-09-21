"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const refreshTokenSchema = new Schema({
    token: { type: String, unique: true },
}, { timestamps: false });
exports.default = mongoose_1.default.model('RefreshToken', refreshTokenSchema, 'refreshTokens');
