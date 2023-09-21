"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'thisismysecret';
class JwtService {
    static sign(payload, expiry = '60s', secret = JWT_SECRET) {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiry });
    }
    static verify(token, secret = JWT_SECRET) {
        return jsonwebtoken_1.default.verify(token, secret);
    }
}
exports.default = JwtService;
