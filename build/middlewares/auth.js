"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomErrorHandler_1 = __importDefault(require("../services/CustomErrorHandler"));
const JwtService_1 = __importDefault(require("../services/JwtService"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler_1.default.unAuthorized());
    }
    const token = authHeader.split(' ')[1];
    try {
        const { _id, role } = yield JwtService_1.default.verify(token);
        const user = {
            _id,
            role
        };
        req.user = user;
        next();
    }
    catch (err) {
        return next(CustomErrorHandler_1.default.unAuthorized());
    }
});
exports.default = auth;
